const ImageProduct = require('../models/ImageProduct');
const OptionsProduct = require('../models/OptionsProduct');
const Product = require('../models/Product')

class ProductController {
    constructor() {
        Product.associate(ImageProduct, OptionsProduct)
    }
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
      const product = await Product.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [
            {
                model:ImageProduct
            },
            {
                model: OptionsProduct
            }
        ]
      });
      
      if (!product) {
        return res.status(404).json({ message: "O produto não existe" });
      }
      return res.status(200).json(product);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar o produto", error: error.message });
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

      const {name, slug, price, price_with_discount} = body
      if (!name || !slug || !price || !price_with_discount) {
        return res.status(400).json({
          message:
            "Todos os campos são obrigatórios (name, slug, price, price_with_discount)",
        });
      }
      const newProduct = await Product.create(body, {
        include: [
            {
                model:ImageProduct
            },
            {
                model:OptionsProduct
            }
        ]
      });
      if (!newProduct) {
        return res.status(400).json({ message: "Dados incorretos" });
      }
      return res.status(201).json({ message: "Produto criado com sucesso" });
    } catch (error) {
      return res.status(500).json({ message: "Erro ao cadastrar produto", error: error.message });
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
      const [affectedRows] = await Product.update(body, {
        where: {
          id: id,
        },
      });

      if (affectedRows.length === 0) {
        return res.status(404).json({
          message: "Produto não encontrado ou nenhum dado foi alterado",
        });
      }
      res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar os dados do produto",
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

      const deletedProduct = await Product.destroy({
        where: {
          id: id,
        },
      });

      if (!deletedProduct) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: "Erro ao atualizar os dados do produto",
        error: error.message,
      });
    }
  }
}

module.exports = ProductController