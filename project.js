let allMeals = []  
    
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
  .then(res => res.json())
  .then(data => {
    console.log(data.meals)
    allMeals = data.meals
  });

const btnclicked = document.getElementById("btn").addEventListener("click", (event)=>{

 findFood(allMeals)
}) 
    const Details = document.getElementById("details")
    const inputfield = document.getElementById("input-box")
    const resultnotfound = document.getElementById("result")
    const productcontainer = document.getElementById("product-items")
    inputfield.addEventListener("click", ()=>{
        resultnotfound.innerText = ""
        productcontainer.innerHTML = ""
        document.getElementById("details").innerHTML = ""

    })
const findFood=(data)=>{
    const inputResult = document.getElementById("input-box").value.trim()
    if(!inputResult){
        return;
    }
    document.getElementById("input-box").value=""
    const matchedData = data.filter(meal=>
        isFuzzy(meal.strMeal, inputResult)
        
    )

    if(matchedData.length==0){
        const div = document.createElement("div")
        div.classList.add("notfound-box")
        div.innerHTML=`
        <p>There no such items</p>
        `
        resultnotfound.appendChild(div)
    }
    else{
        
        matchedData.forEach(item => {
            const div = document.createElement("div")
            div.classList.add("food-box")
            div.innerHTML = `
            <img class="food-img" src=${item.strMealThumb} alt="" />
            <p>Title: ${item.strMeal}</p>
            `
            productcontainer.appendChild(div)
            div.addEventListener("click", (event)=>{
                singleProductDetails(item)
            })
        });
    }
   

}
const isFuzzy=(title, search)=>{
    let i=0, j=0
    title = title.toLowerCase();
    search = search.toLowerCase();
    while(i < title.length && j <search.length){
        if(title[i]===search[j]){
            j++
        }
        i++
    }
    return j==search.length

}


const singleProductDetails=(item)=>{
    const itemName = item.strMeal
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${itemName}`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        const Meal = data.meals[0]
        
        document.getElementById("details").innerHTML = ""
        const detailsCard = document.createElement("div")
        detailsCard.classList.add("details-card")
        const imgBox = document.createElement("div")
        imgBox.classList.add("singleItemImg")
        imgBox.innerHTML = `
        <img class="singleimg" src="${Meal.strMealThumb}" alt="" />
        `
        detailsCard.appendChild(imgBox)
        
        const singleItemIngrd = document.createElement("div")
        singleItemIngrd.classList.add("singleIemIngrd")
        const ul = document.createElement("ul")
        const h4 = document.createElement("h4")
        h4.classList.add("ingrd-h")
        h4.innerText=`
        Ingridients
        `
        ul.classList.add("ingrd-ul")
        for(let i=1; i<=20; i++){
            let ingrd = Meal[`strIngredient${i}`]
            let measure = Meal[`strMeasure${i}`]
            if(ingrd && ingrd.trim()!=""){
                const li = document.createElement("li")
                li.classList.add("ingrd-li")
                li.innerText = `${ingrd} : ${measure}`
                ul.appendChild(li)
            }
        }
        singleItemIngrd.appendChild(h4)
        singleItemIngrd.appendChild(ul)
        detailsCard.appendChild(singleItemIngrd)
        Details.appendChild(detailsCard)
    })
}