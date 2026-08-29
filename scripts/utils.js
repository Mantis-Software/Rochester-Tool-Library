document.getElementById("answer1").style.display = "none"
document.getElementById("answer2").style.display = "none"
document.getElementById("answer3").style.display = "none"

function change_visibility_answer(answer_id)
{
    let current_visibility = document.getElementById(answer_id).style.display;
    if(current_visibility == "none")
    {
        document.getElementById(answer_id).style.display = "block"
    }else if(current_visibility == "block")
    {
        document.getElementById(answer_id).style.display = "none"
    }
}
