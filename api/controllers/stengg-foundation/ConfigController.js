module.exports = {

  identity: 'api/stengg-foundation/config',

  index: function(req, res) {
    res.json(sails.config);
  },

  findOne: function(req, res) {
    res.json(sails.config[req.param('id')]);
  },

  blueprints: function (req, res) {
    res.json(sails.config.blueprints);
  },
  routes: function (req, res) {
    res.json(sails.config.routes);
  },

  value: function(req, res) {
    var value = sails.config[req.param('section')][req.param('id')];
    res.ok(value);
  }
};

