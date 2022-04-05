const arrows = document.querySelectorAll('div.task i')
arrows.forEach((arrow)=>{
    arrow.addEventListener("click",function(){
        arrow.closest("div.task").classList.toggle("off")
    })
})