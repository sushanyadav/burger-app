import React from 'react'
import styles from './Burger.module.scss'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const Burger = ({ ingredients }) => {

    let transformedIngredients = Object.keys(ingredients).map((ingredient) => {
        return [...Array(ingredients[ingredient])].map((_, i) => {
            return <BurgerIngredient key={ingredient + i} type={ingredient} />
        })
    })


    if (transformedIngredients.flat().length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>
    }

    // if (transformedIngredients[0].length === 0 &&
    //     transformedIngredients[1].length === 0 &&
    //     transformedIngredients[2].length === 0 &&
    //     transformedIngredients[3].length === 0) {
    //     transformedIngredients = <p>Please start adding ingredients</p>
    // }

    return (
        <div>
            <div className={styles.Burger}>
                <BurgerIngredient type={'bread-top'} />
                {
                    transformedIngredients
                }
                <BurgerIngredient type={'bread-bottom'} />
            </div>
        </div>
    )
}

export default Burger



