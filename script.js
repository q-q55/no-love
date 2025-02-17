let yesButton = document.getElementById("yes");
let noButton = document.getElementById("no");
let questionText = document.getElementById("question");
let mainImage = document.getElementById("mainImage");
let qq = 0;
let clickCount = 0;  // 记录点击 No 的次数

// No 按钮的文字变化
const noTexts = [
    "？你认真的吗…", 
    "要不再想想？", 
    "不许选这个！ ", 
    "我会很伤心…", 
    "不行:("
];

// No 按钮点击事件
noButton.addEventListener("click", function() {
    clickCount++;

       // No 文案变化（前 5 次变化）
    if (clickCount <= 5) {
        noButton.innerText = noTexts[clickCount - 1];
    }
    if(qq>0){qq--;questionText.innerText = "财运+"+qq;}
    // 图片变化（前 5 次变化）
    if (clickCount === 1) mainImage.src = "./images/shocked.png"; // 震惊
    if (clickCount === 2) mainImage.src = "./images/think.png";   // 思考
    if (clickCount === 3) mainImage.src = "./images/angry.png";   // 生气
    if (clickCount === 4) mainImage.src = "./images/crying.png";  // 哭
    if (clickCount >= 5) mainImage.src = "./images/crying.png";  // 之后一直是哭

});

// Yes 按钮点击后，进入表白成功页面
yesButton.addEventListener("click", function() {
	qq++;
      questionText.innerText = "财运+"+qq;
	mainImage.src = "./images/heart.png";
});