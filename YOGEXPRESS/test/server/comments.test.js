const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect
const app = require('../../app/app')
const db = require('../../app/db')

describe("/api/posts/:post_id/comments", () => {

  let post, post2

  beforeEach(() => {
    return Promise.all([
        db('comments').del(),
        db('posts').del(),
      ]).then(function () {
        return db('posts')
          .insert({title: "Foo", body: "Bar", author: 'Alexander', image_url: 'foo.jpg'})
          .returning('*')
          .then((result) => post = result[0])
      }).then(function () {
        return db('posts')
          .insert({title: "Foo", body: "Bar", author: 'Alexander', image_url: 'foo.jpg'})
          .returning('*')
          .then((result) => post2 = result[0])
      })
  })

  describe("GET /api/posts/:post_id/comments", () => {

    beforeEach(() => {
      return db('comments').insert({content: "Bar", post_id: post.id})
        .then( () => db('comments').insert({content: "Bar", post_id: post2.id}))
    })

    it("returns all comments for the post", () => {
      return chai.request(app)
        .get(`/api/posts/${post.id}/comments`)
        .then((res) => {
          expect(res).to.have.status(200)
          expect(res.body.length).to.eq(1)
          expect(res.body[0]).to.have.property("content")
          expect(res.body[0]).to.have.property("created_at")
        })
        .catch((err) => {throw err})
    })

  })

  describe("POST /api/posts/:post_id/comments", () => {

    it("adds a comment when passed valid data", () => {
      return db('comments').count().then((count) => {
        return chai.request(app)
          .post(`/api/posts/${post.id}/comments`)
          .send({ content: 'comment text' })
          .then((res) => {
            expect(res).to.have.status(200)
            expect(res.body.content).to.eq("comment text")
            expect(res.body.created_at).to.be
            expect(res.body.id).to.be

            return db('comments').count().then((newCount) => {
              expect(parseInt(newCount[0].count, 10)).to.eq(parseInt(count[0].count, 10) + 1)
            })
          })
          .catch((err) => {throw err})
      })
    })

    it("returns an error message when fields are empty", () => {
      return db('comments').count().then((count) => {
        return chai.request(app)
          .post(`/api/posts/${post.id}/comments`)
          .send({ })
          .catch((err) => {
            const res = err.response
            expect(res).to.have.status(422)
            expect(res.body.errors).to.deep.eq([
              {field: "content", messages: ["cannot be blank"]},
            ])

            return db('comments').count().then((newCount) => {
              expect(parseInt(newCount[0].count, 10)).to.eq(parseInt(count[0].count, 10))
            })
          })
          .catch((err) => {throw err})
      })
    })

  })

  describe("PATCH /api/posts/:post_id/comments/:id", () => {

    let comment

    beforeEach(() => {
      return db('comments')
        .insert({post_id: post.id, content: "Bar"})
        .returning('*')
        .then((result) => comment = result[0])
    })

    it("updates the comment", () => {
      return chai.request(app)
        .patch(`/api/posts/${post.id}/comments/${comment.id}`)
        .send({ content: 'comment text' })
        .then((res) => {
          expect(res).to.have.status(200)
          expect(res.body.content).to.eq("comment text")
          expect(res.body.id).to.eq(comment.id)
        })
        .catch((err) => {throw err})
    })

    it("returns an error message when fields are empty", () => {
      return chai.request(app)
        .patch(`/api/posts/${post.id}/comments/${comment.id}`)
        .send({ })
        .catch((err) => {
          const res = err.response
          expect(res).to.have.status(422)
          expect(res.body.errors).to.deep.eq([
            {field: "content", messages: ["cannot be blank"]},
          ])

          return db('comments').where({post_id: post.id}).first().then(comment => {
            expect(comment.content).to.eq('Bar')
          })
        })
        .catch((err) => {throw err})
    })

  })

  describe("DELETE /api/posts/:post_id/comments/:id", () => {

    let comment

    beforeEach(() => {
      return db('comments')
        .insert({content: "Bar", post_id: post.id})
        .returning('*')
        .then((result) => comment = result[0])
    })

    it("deletes the post", () => {
      return db('comments').count().then((count) => {
        return chai.request(app)
          .delete(`/api/posts/${post.id}/comments/${comment.id}`)
          .then((res) => {
            expect(res).to.have.status(200)

            return db('comments').count().then((newCount) => {
              expect(parseInt(newCount[0].count, 10)).to.eq(parseInt(count[0].count, 10) - 1)
            })
          })
          .catch((err) => {throw err})
      })
    })

  })

})
