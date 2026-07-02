const sentences = [

{
    chinese:"这家韩式紫菜包饭真不赖。",
    pinyin:"Zhè jiā Hánshì zǐcài bāofàn zhēn bú lài.",
    korean:"이 한국식 김밥집 정말 괜찮다."
},

{
    chinese:"没想到在中国也能吃到这么地道的韩餐。",
    pinyin:"Méi xiǎngdào zài Zhōngguó yě néng chī dào zhème dìdao de Háncān.",
    korean:"중국에서도 이렇게 정통 한국 음식을 먹을 수 있을 줄 몰랐다."
},

{
    chinese:"今天工作特别忙。",
    pinyin:"Jīntiān gōngzuò tèbié máng.",
    korean:"오늘 일이 정말 바빴다."
},

{
    chinese:"你吃过韩国泡菜吗？",
    pinyin:"Nǐ chīguo Hánguó pàocài ma?",
    korean:"한국 김치 먹어본 적 있어?"
}

];

let currentIndex = 0;
let pinyinVisible = true;

function renderSentence(){

    document.getElementById("sentence").innerText =
        sentences[currentIndex].chinese;

    document.getElementById("meaning").innerText =
        sentences[currentIndex].korean;

    document.getElementById("pinyin").innerText =
        pinyinVisible
        ? sentences[currentIndex].pinyin
        : "";
}

function nextSentence(){

    currentIndex++;

    if(currentIndex >= sentences.length){
        currentIndex = 0;
    }

    renderSentence();
}

function randomSentence(){

    currentIndex =
        Math.floor(Math.random() * sentences.length);

    renderSentence();
}

function togglePinyin(){

    pinyinVisible = !pinyinVisible;

    renderSentence();
}

function speakSentence(){

    const utterance =
        new SpeechSynthesisUtterance(
            sentences[currentIndex].chinese
        );

    utterance.lang = "zh-CN";

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}

renderSentence();
<h2 style="margin-top:30px;">문장 추가</h2>

<input id="newChinese" placeholder="중국어 문장">

<input id="newPinyin" placeholder="병음">

<input id="newKorean" placeholder="한국어 뜻">

<button onclick="addSentence()">
문장 저장
</button>


const savedData =
JSON.parse(localStorage.getItem("mySentences"));

if(savedData){
    sentences.push(...savedData);
}
function addSentence(){

    const chinese =
    document.getElementById("newChinese").value;

    const pinyin =
    document.getElementById("newPinyin").value;

    const korean =
    document.getElementById("newKorean").value;

    if(!chinese){
        alert("중국어 문장을 입력하세요.");
        return;
    }

    const newSentence = {
        chinese,
        pinyin,
        korean
    };

    sentences.push(newSentence);

    const customSentences =
        sentences.slice(4);

    localStorage.setItem(
        "mySentences",
        JSON.stringify(customSentences)
    );

    alert("저장 완료!");

    document.getElementById("newChinese").value="";
    document.getElementById("newPinyin").value="";
    document.getElementById("newKorean").value="";
}
