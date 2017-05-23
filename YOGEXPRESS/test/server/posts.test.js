const chai = require('chai')
const chaiHttp = require('chai-http')
chai.use(chaiHttp)
const expect = chai.expect
const app = require('../../app/app')
const db = require('../../app/db')

describe("/api/posts", () => {

  beforeEach(() => {
    return Promise.all([
        db('comments').del(),
        db('posts').del(),
      ])
  })

  describe("GET /api/posts", () => {

    beforeEach(() => {
      return db('posts')
        .insert({title: "Foo", body: "Bar", author: 'Alexander', image_url: 'foo.jpg'})
        .returning('*')
        .then(posts => posts[0])
        .then(post => {
          return db('comments')
            .insert({post_id: post.id, content: 'Firsties'})
            .then( () => post )
        })
        .then(post => {
          return db('comments')
            .insert({post_id: post.id, content: 'Secondz'})
            .then( () => post )
        })
    })

    it("returns all posts", () => {
      return chai.request(app)
        .get('/api/posts')
        .then((res) => {
          expect(res).to.have.status(200)
          expect(res.body.length).to.eq(1)
          expect(res.body[0]).to.have.property("title")
          expect(res.body[0]).to.have.property("body")
          expect(res.body[0]).to.have.property("author")
          expect(res.body[0]).to.have.property("vote_count")
          expect(res.body[0]).to.have.property("image_url")
          expect(res.body[0]).to.have.property("created_at")

          const comments = res.body[0].comments
          expect(comments.length).to.eq(2)
        })
        .catch((err) => {throw err})
    })

  })

  describe("POST /api/posts", () => {

    it("adds a post and returns the id when passed valid data", () => {
      return db('posts').count().then((count) => {
        return chai.request(app)
          .post('/api/posts')
          .send({ title: 'post title', body: 'post text', author: 'some author', image_url: "image.jpg" })
          .then((res) => {
            expect(res).to.have.status(200)
            expect(res.body.title).to.eq("post title")
            expect(res.body.body).to.eq("post text")
            expect(res.body.author).to.eq("some author")
            expect(res.body.vote_count).to.eq(0)
            expect(res.body.created_at).to.be
            expect(res.body.id).to.be
            return db('posts').count().then((newCount) => {
              expect(parseInt(newCount[0].count, 10)).to.eq(parseInt(count[0].count, 10) + 1)
            })
          })
          .catch((err) => {throw err})
      })
    })

    it("returns an error message when fields are empty", () => {
      return db('posts').count().then((count) => {
        return chai.request(app)
          .post('/api/posts')
          .send({ })
          .catch((err) => {
            const res = err.response
            expect(res).to.have.status(422)
            expect(res.body.errors).to.deep.eq([
              {field: "title", messages: ["cannot be blank"]},
              {field: "body", messages: ["cannot be blank"]},
              {field: "author", messages: ["cannot be blank"]},
              {field: "image_url", messages: ["cannot be blank"]},
            ])

            return db('posts').count().then((newCount) => {
              expect(parseInt(newCount[0].count, 10)).to.eq(parseInt(count[0].count, 10))
            })
          })
          .catch((err) => {throw err})
      })
    })

  })

  describe("GET /api/posts/:id", () => {

    let post

    beforeEach(() => {
      return db('posts')
        .insert({title: "Foo", body: "Bar", author: 'Alexander', image_url: 'foo.jpg'})
        .returning('*')
        .then((result) => post = result[0])
    })

    it("gets the post", () => {
      return chai.request(app)
        .get(`/api/posts/${post.id}`)
        .then((res) => {
          expect(res).to.have.status(200)
          expect(res.body.title).to.eq("Foo")
          expect(res.body.body).to.eq("Bar")
          expect(res.body.author).to.eq("Alexander")
          expect(res.body.vote_count).to.eq(0)
          expect(res.body.id).to.eq(post.id)
        })
        .catch((err) => {throw err})
    })

  })

  describe("PATCH /api/posts/:id", () => {

    let post

    beforeEach(() => {
      return db('posts')
        .insert({title: "Foo", body: "Bar", author: 'Alexander', image_url: "image.jpg"})
        .returning('*')
        .then((result) => post = result[0])
    })

    it("updates the post", () => {
      return chai.request(app)
        .patch(`/api/posts/${post.id}`)
        .send({ title: 'post title', body: 'post text', author: 'some author', vote_count: 1, image_url: "other.jpg" })
        .then((res) => {
          expect(res).to.have.status(200)
          expect(res.body.title).to.eq("post title")
          expect(res.body.body).to.eq("post text")
          expect(res.body.author).to.eq("some author")
          expect(res.body.image_url).to.eq("other.jpg")
          expect(res.body.vote_count).to.eq(0)
          expect(res.body.id).to.eq(post.id)
        })
        .catch((err) => {throw err})
    })

    it("returns an error message when fields are empty", () => {
      return chai.request(app)
        .patch(`/api/posts/${post.id}`)
        .send({ })
        .catch((err) => {
          const res = err.response
          expect(res).to.have.status(422)
          expect(res.body.errors).to.deep.eq([
            {field: "title", messages: ["cannot be blank"]},
            {field: "body", messages: ["cannot be blank"]},
            {field: "author", messages: ["cannot be blank"]},
            {field: "image_url", messages: ["cannot be blank"]},
          ])

          return db('posts').where({id: post.id}).first().then(post => {
            expect(post.title).to.eq('Foo')
            expect(post.body).to.eq('Bar')
          })
        })
        .catch((err) => {throw err})
    })

  })

  describe("DELETE /api/posts/:id", () => {

    let post

    beforeEach(() => {
      return db('posts')
        .insert({title: "Foo", body: "Bar", author: 'Alexander', image_url: 'image.jpg'})
        .returning('*')
        .then((result) => post = result[0])
    })

    it("deletes the post", () => {
      return db('posts').count().then((count) => {
        return chai.request(app)
          .delete(`/api/posts/${post.id}`)
          .then((res) => {
            expect(res).to.have.status(200)

            return db('posts').count().then((newCount) => {
              expect(parseInt(newCount[0].count, 10)).to.eq(parseInt(count[0].count, 10) - 1)
            })
          })
          .catch((err) => {throw err})
      })
    })

  })

  describe("POST /api/posts/:id/votes", () => {

    let post

    beforeEach(() => {
      return db('posts')
        .insert({title: "Foo", body: "Bar", author: 'Alexander', image_url: "image.jpg", vote_count: 5})
        .returning('*')
        .then((result) => post = result[0])
    })

    it("increases the vote count", () => {
      return chai.request(app)
        .post(`/api/posts/${post.id}/votes`)
        .then((res) => {
          expect(res).to.have.status(200)
          expect(res.body.vote_count).to.eq(6)
        })
        .catch((err) => {throw err})
    })

  })

  describe("DELETE /api/posts/:id/votes", () => {

    let post

    beforeEach(() => {
      return db('posts')
        .insert({title: "Foo", body: "Bar", author: 'Alexander', image_url: "image.jpg", vote_count: 5})
        .returning('*')
        .then((result) => post = result[0])
    })

    it("decreases the vote count", () => {
      return chai.request(app)
        .delete(`/api/posts/${post.id}/votes`)
        .then((res) => {
          expect(res).to.have.status(200)
          expect(res.body.vote_count).to.eq(4)
        })
        .catch((err) => {throw err})
    })

  })

})
