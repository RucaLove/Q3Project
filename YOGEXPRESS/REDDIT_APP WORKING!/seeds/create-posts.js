
exports.seed = function(knex, Promise) {

  const text1 = [
    "In keeping with the evolutionary development of the Boxer line, the engine was a longitudinal opposed 2-cylinder boxer engine with lower camshaft and overhead valves. Driving the camshaft was a duplex (later simplex) chain with a spring-loaded chain tensioner. The clutch was a single dry plate with cable actuation. A 5-speed manual transmission, with an optional kickstarter for the early models, and shaft drive to the rear wheel completed the drivetrain.",
  ].join("\n")

  const text2 = [
    "In the 1980s for environmental and marketing reasons, BMW initiated a move to the water-cooled K75 and K100 models to remain competitive with the technical lead of the Japanese motorcycle industry. For this purpose they wanted to give up the production of the airhead two-valve boxer models. This decision led to protests from customers and dealers, BMW restarted R100 production, but with modified lower output, and improved torque curve engines with 44 kW (60 hp). They later produced an 800 cc version with 37 kW (50 hp).",
  ].join("\n\n")

  const text3 = [
    "Windy roads late at night is where I find true happiness",
  ].join("\n\n")

  return knex('comments').del()
    .then(() => knex('posts').del())
    .then(function () {
      return Promise.all([
        createPost(
          'My love of two wheels',
          text1,
          'R100_Ridr',
          'http://www.neverra.com/sites/default/files/IMCE/BMW_custom_CRD_65_04.jpg',
          new Date(2012, 12, 17)
        ),
        createPost(
          'Raw R100',
          text2,
          'Bmw_Brapps',
          'http://cdn.blessthisstuff.com/imagens/stuff/bmw-r100-crd-motorcycles-10.jpg',
          new Date(2017, 1, 11)
        ),
        createPost(
          "If your bike isn't black we can't be friends",
          text3,
          'bavarian-fistfighter',
          'http://www.wunderlichamerica.com/blog/wp-content/uploads/2016/03/bavarian-fistfighter-5.jpg',
          new Date(2017, 5, 12)
        ),
      ])
    }).then(function (postIds) {
      return Promise.all([
        knex('comments').insert({post_id: postIds[0], content: 'I can relate'}),
        knex('comments').insert({post_id: postIds[0], content: 'Win'}),
        knex('comments').insert({post_id: postIds[2], content: 'Welcome to my life'}),
      ])
    })

  function createPost(title, body, author, image_url, created_at) {
    return knex('posts')
      .insert({title, body, author, image_url, created_at})
      .returning('id')
      .then(ids => ids[0])
  }
};
