const Category = require("../models/Category");

class CategoryController {
  async search(req, res) {
    try {
      const { limit = 12, page = 1, fields, use_in_menu } = req.query;

      const parsedLimit = parseInt(limit);
      const parsedPage = parseInt(page);

      const attributes = fields ? fields.split(",") : {exclude: ['createdAt', 'updatedAt']};

      const where = {};
      if (use_in_menu !== undefined) {
        where.use_in_menu = use_in_menu === "true";
      }

      const queryOptions = { where, attributes };

      if (parsedLimit!== -1) {
        
        queryOptions.limit = parsedLimit;
        queryOptions.offset = (parsedPage - 1) * parsedLimit;
      }

      const categories = await Category.findAndCountAll(queryOptions)

      return res.status(200).json({
        data: categories.rows,
        total:categories.count,
        limit: parsedLimit,
        page:parsedPage
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar categorias", error: error.message });
    }
  }

  async consultForId(req, res) {
    try {
      const id = req.params.id;
      const category = await Category.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      });
      if (!category) {
        return res.status(404).json({ message: "A categoria não existe" });
      }
      return res.status(200).json(category);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar a categoria", error: error.message });
    }
  }

  async register(req, res) {
    try {
      const body = req.body;
      //  if (!req.user) {
      //    return res
      //      .status(401)
      //      .json({ message: "Não autorizado: token inválido ou ausente" });
      //  }
      if (!body.name || !body.slug) {
        return res.status(400).json({
          message:
            "Todos os campos são obrigatórios (name, slug)",
        });
      }
      const newCategory = await Category.create(body);
      if (!newCategory) {
        return res.status(400).json({ message: "Dados incorretos" });
      }
      return res.status(201).json({ message: "Categoria criada com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao cadastrar categoria" });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
      // if (!req.user) {
      //   return res
      //     .status(401)
      //     .json({ message: "Não autorizado: token inválido ou ausente" });
      // }

      if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({
          message: "Requisição inválida: nenhum dado enviado para atualização",
        });
      }
      const [affectedRows] = await Category.update(body, {
        where: {
          id: id,
        },
      });

      if (affectedRows.length === 0) {
        return res.status(404).json({
          message: "Categoria não encontrada ou nenhum dado foi alterado",
        });
      }
      res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar os dados da categoria",
        error: error.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      // if (!req.user) {
      //   return res
      //     .status(401)
      //     .json({ message: "Não autorizado: token inválido ou ausente" });
      // }

      const deletedCategory = await Category.destroy({
        where: {
          id: id,
        },
      });

      if (!deletedCategory) {
        return res.status(404).json({ message: "Categoria não encontrada" });
      }
      res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar os dados da categoria",
        error: error.message,
      });
    }
  }
}

module.exports = CategoryController;
