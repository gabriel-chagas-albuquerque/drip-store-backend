const Category = require('../models/Category');
const ImageProduct = require('../models/ImageProduct');
const OptionsProduct = require('../models/OptionsProduct');
const Product = require('../models/Product')
const { Op } = require('sequelize');
const ProductsCategory = require('../models/ProductsCategory');

class ProductController {
    constructor() {
        Product.associate(ImageProduct, OptionsProduct, Category, ProductsCategory)
    }
    async search(req, res) {
    try {
             const { 
                limit = 12, 
                page = 1, 
                fields, 
                match, 
                category_ids, 
                'price-range': priceRange, 
                option 
            } = req.query;

            const parsedLimit = parseInt(limit);
            const parsedPage = parseInt(page);

            let attributes;
            if (fields) {
                attributes = fields.split(",");
            } else {
                attributes = { exclude: ['createdAt', 'updatedAt'] };
            }

            const queryOptions = {
                attributes,
                include: [
                    {
                        model: ImageProduct,
                        attributes: fields && fields.includes('images') ? undefined : ['id','path']
                    },
                    {
                        model: OptionsProduct,
                        attributes: ['id', 'title', 'shape', 'radius', 'type', 'values']
                    }
                ],
                where: {}
            };
            if (parsedLimit !== -1) {
                queryOptions.limit = parsedLimit;
                queryOptions.offset = (parsedPage - 1) * parsedLimit;
            }
            if (match) {
                queryOptions.where[Op.or] = [
                    { name: { [Op.like]: `%${match}%` } },
                    { description: { [Op.like]: `%${match}%` } }
                ];
            }

            if (category_ids) {
                const categoryArray = category_ids.split(',').map(id => parseInt(id.trim()));
                queryOptions.where.category_id = { [Op.in]: categoryArray };
            }

            // Filtro por faixa de preço
            if (priceRange) {
                const [minPrice, maxPrice] = priceRange.split('-').map(price => parseFloat(price.trim()));
                if (minPrice && maxPrice) {
                    queryOptions.where.price = {
                        [Op.between]: [minPrice, maxPrice]
                    };
                } else if (minPrice) {
                    queryOptions.where.price = {
                        [Op.gte]: minPrice
                    };
                } else if (maxPrice) {
                    queryOptions.where.price = {
                        [Op.lte]: maxPrice
                    };
                }
            }

            if (option) {
                const optionFilters = [];
                
                for (const [key, value] of Object.entries(option)) {
                    if (key.startsWith('[') && key.endsWith(']')) {
                        const optionId = key.slice(1, -1);
                        const optionValues = value.split(',').map(v => v.trim());
                        
                        optionFilters.push({
                            id: parseInt(optionId),
                            values: optionValues
                        });
                    }
                }

                if (optionFilters.length > 0) {
                    queryOptions.include[1].where = {
                        [Op.or]: optionFilters.map(filter => ({
                            id: filter.id,
                            values: {
                                [Op.overlap]: filter.values
                            }
                        }))
                    };
                    queryOptions.include[1].required = true;
                }
            }

      const products = await Product.findAndCountAll(queryOptions)

       return res.status(200).json({
                data: products.rows,
                total: products.count,
                limit: parsedLimit,
                page: parsedPage,
                filters: {
                    match: match || null,
                    category_ids: category_ids || null,
                    price_range: priceRange || null,
                    option: option || null
                }
            });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar os produtos", error: error.message });
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