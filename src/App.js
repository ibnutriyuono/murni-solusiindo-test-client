import React, { useEffect, useState } from 'react'

const App = () => {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState('')
  useEffect(() => {
    (async () => {
      const [categoriesResponse, productsResponse] = await Promise.all([
        await fetch('http://localhost:3000/products/categories'),
        await fetch('http://localhost:3000/products')
      ])
      const categoriesData = await categoriesResponse.json()
      const productsData = await productsResponse.json()
      setCategories(categoriesData)
      setProducts(productsData.products)
    })()
  }, [])

  const handleCategories = async () => {
    let categoryId
    if (category === "Makanan") {
      categoryId = 1
    } else if (category === "Snack") {
      categoryId = 2
    }
    if (categoryId) {
      const responses = await fetch(`http://localhost:3000/products/categories/${categoryId}`)
      const data = await responses.json()
      setProducts(products)
    } else {
      const respones = await fetch('http://localhost:3000/products')
      const data = await respones.json()
      setProducts(data.products)
    }
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3">
        <form>
          <select className="form-select"  onChange={(e) => setCategory(e.target.value)}>
          <option defaultValue="All Data">Kategori</option>
            {
              categories?.map(category => {
                return (
                  <option key={category.id} defaultValue={category.id}>{ category.name }</option>
                )
              })
            }
          </select>
        </form>
        </div>
        <div className="col-md-3">
          <button 
            type="button" 
            className="btn btn-primary" 
            onClick={() => handleCategories()}>
            Tampilkan
          </button>
        </div>
        <div className="col-md-3">
          <button type="button" className="btn btn-primary">
            Primary
          </button>
        </div>
        <div className="col-md-3">
          <button type="button" className="btn btn-primary">
            Primary
          </button>
        </div>
      </div>
      <div className="row mt-5">
        {
          products?.map(category => {
            return category.ProductContents?.map(product => {
              return (
                <div key={product.id} className="col-md-2">
                  <div className="card">
                    <img src={product.Preview.content} className="card-img-top" alt={product.title} />
                    <div className="card-body">
                      <p className="card-text">{ product.title }</p>
                    </div>
                  </div>
                </div>
              )
            })
          })
        }
      </div>
    </div>
  )
}

export default App
