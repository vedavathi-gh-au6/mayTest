var Company = require("../../models/Company");

module.exports = {
  renderCompanyPage: function(req, res) {
    var user = req.user;
    console.log(user)
    Company.find({ user: req.user._id })
      .then(function(companies) {
        return res.render("dashboard", {
          userId: user.id,
          name: user.name,
          companies: companies,
          length: companies.length
        });
        //console.log(company.length)
      })
      .catch(function(err) {
        console.log(err.message);
        return res.status(500).send("Server error");
      });
  },

  renderaddCompnayPage: function(req, res) {
    res.render("addCompany", {
      userId: req.user.id,
      title: "Company create page"
    });
  },
/*
  renderUpdateTodoPage: function(req, res) {
    var user = req.user;
    var todoId = req.params.todoId;
    Todo.findById(todoId)
      .then(function(todo) {
        return res.render("todoUpdate", {
          title: "Todo update page",
          userId: user.id,
          todo: todo
        });
      })
      .catch(function(err) {
        return res.status(500).send(`Server Error ${err.message}`);
      });
  }
  */
};
