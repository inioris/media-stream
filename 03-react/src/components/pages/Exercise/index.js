import './assets/styles.css'
import React, { useState } from 'react'

const Exercise01 = () => {
  const movies = [
    {
      id: 1,
      name: 'Star Wars',
      price: 20
    },
    {
      id: 2,
      name: 'Minions',
      price: 25
    },
    {
      id: 3,
      name: 'Fast and Furious',
      price: 10
    },
    {
      id: 4,
      name: 'The Lord of the Rings',
      price: 5
    }
  ]

  const discountRules = [
    {
      m: [3, 2],
      discount: 0.25
    },
    {
      m: [2, 4, 1],
      discount: 0.5
    },
    {
      m: [4, 2],
      discount: 0.1
    }
  ]

  const [cart, setCart] = useState([])

  const onClickHandle = (data) => {
    const movie = cart.find((item) => item.id === data.id)
    console.log(movie)
    if (movie) {
      movie.quantity = movie.quantity + 1
      movie.price = data.price * movie.quantity
      setCart([...cart])
    } else {
      setCart([...cart, {
        id: data.id,
        name: data.name,
        price: data.price,
        quantity: 1
      }])
    }
  }

  const removeProducts = (key) => {
    const moviesRemove = cart.filter((item) => item.id !== key)
    setCart([
      ...moviesRemove
    ])
  }

  const onPlusMovies = (option) => {
    const price = (movies.find((item) => item.id === option.key)).price
    const movie = cart.find((item) => item.id === option.key)

    if (option.name === 'less') {
      movie.quantity = Number(movie.quantity - 1)
      movie.price = price * movie.quantity
      if (!movie.quantity) {
        removeProducts(option.key)
      } else {
        setCart([
          ...cart
        ])
      }
    } else if (option.name === 'plus') {
      movie.quantity = Number(movie.quantity + 1)
      movie.price = Number(price * movie.quantity)

      setCart([
        ...cart
      ])
    }
  }

  const discont = (sale) => {
    // eslint-disable-next-line array-callback-return
    const response = discountRules.map((item) => {
      if (item.m.equals(sale)) {
        return item.discount
      }
    })

    return response
  }

  const getTotal = () => {
    let priceTotal = 0
    const ofert = []
    if (cart.length) {
      // eslint-disable-next-line array-callback-return
      cart.map((item) => {
        priceTotal = Number(item.price + priceTotal)
        ofert.push(item.quantity)
      })
      const isOffers = discont(ofert)
      console.log(isOffers)
    }
    return priceTotal
  }

  return (
      <>
        <section className="exercise01">
          <div className="movies__list">
            <ul>
              { movies.map((o) => {
                return (
                    <>
                <li className="movies__list-card">
                  <ul>
                    <li>
                      ID: {o.id}
                    </li>
                    <li>
                      Name: {o.name}
                    </li>
                    <li>
                      Price: ${o.price}
                    </li>
                  </ul>
                  {/* eslint-disable-next-line react/react-in-jsx-scope */}
                  <button onClick={ () => onClickHandle(o)} style={{ cursor: 'hover' }}>
                    Add to cart
                  </button>
                </li>
              </>
                )
              })
              }
            </ul>
          </div>
          <div className="movies__cart">
            <ul>
              {
                cart.length
                  ? cart.map(x => (
                  <>
                <li className="movies__cart-card">
                  <ul>
                    <li>
                      ID: {x.id}
                    </li>
                    <li>
                      Name: {x.name}
                    </li>
                    <li>
                      Price: ${x.price}
                    </li>
                  </ul>
                  <div className="movies__cart-card-quantity">
                    <button onClick={() => onPlusMovies({
                      name: 'less',
                      quantity: 1,
                      key: x.id
                    })}>
                      -
                    </button>
                    <span>
                      {x.quantity}
                    </span>
                    <button onClick={() => onPlusMovies({
                      name: 'plus',
                      quantity: 1,
                      key: x.id
                    })}>
                      +
                    </button>
                  </div>
                </li>
                </>
                  ))
                  : <> <div>no tienes peliculas en el carrito</div> </>
              }
            </ul>
            <div className="movies__cart-total">
              <p>Total: ${getTotal()}</p>
            </div>
          </div>
        </section>
      </>
  )
}

export default Exercise01
