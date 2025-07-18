const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
  async consultForId(req, res) {
    try {
      const id = req.params.id;
      const user = await User.findByPk(id, {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      });
      if (!user) {
        return res.status(404).json({ message: "O usuário não existe" });
      }
      return res.status(200).json(user);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar usuário", error: error.message });
    }
  }

  async register(req, res) {
    try {
      const body = req.body;
      if (!body.firstname || !body.surname || !body.email || !body.password) {
        return res.status(400).json({
          message:
            "Todos os campos são obrigatórios (firstname, surname, email, password)",
        });
      }
      body.password = await bcrypt.hash(body.password, 10);

      const newUser = await User.create(body);
      if (!newUser) {
        return res.status(400).json({ message: "Dados incorretos" });
      }
      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao cadastrar usuário" });
    }
  }

  async tokenGenerate(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email.toLowerCase(),
        },
      });

      if (!user) {
        return res.status(400).json({ error: "Credenciais inválidas" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({ error: "Credenciais inválidas" });
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email,
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );
      return res.status(200).json({ token: token });
    } catch (error) {
      return res.status(500).json({
        error: "Erro interno do servidor",
      });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;

      if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({
          message: "Requisição inválida: nenhum dado enviado para atualização",
        });
      }
      const [affectedRows] = await User.update(body, {
        where: {
          id: id,
        },
      });

      if (affectedRows.length === 0) {
        return res.status(404).json({
          message: "Usuário não encontrado ou nenhum dado foi alterado",
        });
      }
      res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar os dados do usuário",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const deletedUser = await User.destroy({
        where: {
          id: id,
        },
      });

      if (!deletedUser) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar os dados do usuário",
        error: error.message,
      });
    }
  }
}

module.exports = UserController;
