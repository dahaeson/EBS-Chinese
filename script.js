// ==========================
// 기본 문장
// ==========================

let defaultSentences = [

{
    id: 1,
    chinese:"这家韩式紫菜包饭真不赖。",
    pinyin:"Zhè jiā Hánshì zǐcài bāofàn zhēn bú lài.",
    korean:"이 한국식 김밥집 정말 괜찮다.",
    favorite:false
},

{
    id: 2,
    chinese:"没想到在中国也能吃到这么地道的韩餐。",
    pinyin:"Méi xiǎngdào zài Zhōngguó yě néng chī dào zhème dìdao de Háncān.",
    korean:"중국에서도 이렇게 정통 한국 음식을 먹을 수 있을 줄 몰랐다.",
    favorite:false
},

{
    id: 3,
    chinese:"今天工作特别忙。",
    pinyin:"Jīntiān gōngzuò tèbié máng.",
    korean:"오늘 일이 정말 바빴다.",
    favorite:false
}

];

// ==========================
// 저장 데이터 불러오기
// ==========================

let savedData =
JSON.parse(
    localStorage.getItem("mySentences")
) || [];

let sentences =
savedData.length > 0
? savedData
: defaultSentences;

// ==========================
// 상태값
// ==========================

let currentIndex = 0;
let pinyinVisible = true;

// ==========================
// 저장
// ==========================

function saveData(){

    localStorage.setItem(
        "mySentences",
        JSON.stringify(sentences)
    );

}

// ==========================
// 현재 문장 표시
// ==========================

function renderSentence(){

    if(sentences.length === 0){

        document.getElementById("sentence").innerText =
        "저장된 문장이 없습니다.";

        document.getElementById("pinyin").innerText = "";
        document.getElementById("meaning").innerText = "";

        return;
    }

    const current =
    sentences[currentIndex];

    document.getElementById("sentence").innerText =
    current.chinese;

    document.getElementById("pinyin").innerText =
    pinyinVisible
    ? current.pinyin
    : "";

    document.getElementById("meaning").innerText =
    current.korean;

}

// ==========================
// 다음 문장
// ==========================

function nextSentence(){

    if(sentences.length === 0) return;

    currentIndex++;

    if(currentIndex >= sentences.length){

        currentIndex = 0;

    }

    renderSentence();

}

// ==========================
// 랜덤 문장
// ==========================

function randomSentence(){

    if(sentences.length === 0) return;

    currentIndex =
    Math.floor(
        Math.random()
        * sentences.length
    );

    renderSentence();

}

// ==========================
// 병음 표시/숨김
// ==========================

function togglePinyin(){

    pinyinVisible =
    !pinyinVisible;

    renderSentence();

}

// ==========================
// 중국어 음성
// ==========================

function speakSentence() {

    const sentence =
    sentences[currentIndex];

    if(!sentence) return;

    speechSynthesis.cancel();

    const utterance =
    new SpeechSynthesisUtterance(
        sentence.chinese
    );

    // 중국어 설정
    utterance.lang = "zh-CN";

    utterance.rate = 0.9;
    utterance.pitch = 1;

    speechSynthesis.speak(
        utterance
    );
}
    

// ==========================
// 현재 문장 즐겨찾기
// ==========================

function toggleCurrentFavorite(){

    if(sentences.length === 0) return;

    sentences[currentIndex].favorite =
    !sentences[currentIndex].favorite;

    saveData();

    renderSentence();
    renderSentenceList();

}

// ==========================
// 문장 추가
// ==========================

function addSentence(){

    const chinese =
    document
    .getElementById("newChinese")
    .value
    .trim();

    const pinyin =
    document
    .getElementById("newPinyin")
    .value
    .trim();

    const korean =
    document
    .getElementById("newKorean")
    .value
    .trim();

    if(chinese === ""){

        alert(
            "중국어 문장을 입력하세요."
        );

        return;
    }

    const newSentence = {

        id: Date.now(),

        chinese,
        pinyin,
        korean,

        favorite:false

    };

    sentences.push(
        newSentence
    );

    saveData();

    document
    .getElementById("newChinese")
    .value = "";

    document
    .getElementById("newPinyin")
    .value = "";

    document
    .getElementById("newKorean")
    .value = "";

    renderSentenceList();

    alert(
        "문장 저장 완료!"
    );

}

// ==========================
// 문장 목록 표시
// ==========================

function renderSentenceList(){

    const list =
    document.getElementById(
        "sentenceList"
    );

    if(!list) return;

    if(sentences.length === 0){

        list.innerHTML = `
        <div class="empty">
            저장된 문장이 없습니다.
        </div>
        `;

        return;
    }

    let html = "";

    sentences.forEach(
    (item,index)=>{

        html += `

        <div class="list-item">

            <div class="cn">

                ${item.chinese}

                ${
                    item.favorite
                    ? '<span class="favorite-mark">⭐</span>'
                    : ''
                }

            </div>

            <div class="py">
                ${item.pinyin || ""}
            </div>

            <div class="kr">
                ${item.korean || ""}
            </div>

            <div class="action-buttons">

                <button
                class="favorite-btn"
                onclick="toggleFavorite(${index})">

                ${
                    item.favorite
                    ? "⭐ 해제"
                    : "☆ 즐겨찾기"
                }

                </button>

                <button
                class="delete-btn"
                onclick="deleteSentence(${index})">

                삭제

                </button>

            </div>

        </div>

        `;

    });

    list.innerHTML = html;

}

// ==========================
// 목록에서 즐겨찾기
// ==========================

function toggleFavorite(index){

    sentences[index].favorite =
    !sentences[index].favorite;

    saveData();

    renderSentenceList();

}

// ==========================
// 즐겨찾기만 보기
// ==========================

function showFavorites(){

    const list =
    document.getElementById(
        "sentenceList"
    );

    const favorites =
    sentences.filter(
        item => item.favorite
    );

    if(favorites.length === 0){

        list.innerHTML = `
        <div class="empty">
            즐겨찾기 문장이 없습니다.
        </div>
        `;

        return;
    }

    let html = "";

    favorites.forEach(item=>{

        html += `

        <div class="list-item">

            <div class="cn">
                ${item.chinese}
            </div>

            <div class="py">
                ${item.pinyin}
            </div>

            <div class="kr">
                ${item.korean}
            </div>

        </div>

        `;

    });

    list.innerHTML = html;

}

// ==========================
// 검색
// ==========================

function searchSentences(){

    const keyword =
    document
    .getElementById(
        "searchInput"
    )
    .value
    .trim()
    .toLowerCase();

    if(keyword === ""){

        renderSentenceList();
        return;

    }

    const result =
    sentences.filter(item =>

        item.chinese
        .toLowerCase()
        .includes(keyword)

        ||

        item.korean
        .toLowerCase()
        .includes(keyword)

        ||

        item.pinyin
        .toLowerCase()
        .includes(keyword)

    );

    const list =
    document.getElementById(
        "sentenceList"
    );

    if(result.length === 0){

        list.innerHTML = `
        <div class="empty">
            검색 결과 없음
        </div>
        `;

        return;
    }

    let html = "";

    result.forEach(item=>{

        html += `

        <div class="list-item">

            <div class="cn">
                ${item.chinese}
            </div>

            <div class="py">
                ${item.pinyin}
            </div>

            <div class="kr">
                ${item.korean}
            </div>

        </div>

        `;

    });

    list.innerHTML = html;

}

// ==========================
// 개별 삭제
// ==========================

function deleteSentence(index){

    const target =
    sentences[index];

    if(!target) return;

    if(
        !confirm(
            "이 문장을 삭제할까요?"
        )
    ){
        return;
    }

    sentences.splice(index,1);

    if(
        currentIndex >=
        sentences.length
    ){
        currentIndex = 0;
    }

    saveData();

    renderSentence();
    renderSentenceList();

}

// ==========================
// 전체 삭제
// ==========================

function deleteAllSentences(){

    if(
        !confirm(
            "모든 문장을 삭제할까요?"
        )
    ){
        return;
    }

    sentences = [];

    currentIndex = 0;

    saveData();

    renderSentence();
    renderSentenceList();

}

// ==========================
// CSV 업로드
// 형식:
// 중국어,병음,뜻
// ==========================

function importCSV(){

    const file =
    document
    .getElementById("csvFile")
    .files[0];

    if(!file){

        alert(
            "CSV 파일을 선택하세요."
        );

        return;
    }

    const reader =
    new FileReader();

    reader.onload =
    function(e){

        const text =
        e.target.result;

        const rows =
        text.split(/\r?\n/);

        let added = 0;

        rows.forEach(row=>{

            if(!row.trim()) return;

            const cols =
            row.split(",");

            if(cols.length < 3) return;

            const sentence = {

                id:
                Date.now()
                + Math.random(),

                chinese:
                cols[0].trim(),

                pinyin:
                cols[1].trim(),

                korean:
                cols[2].trim(),

                favorite:false

            };

            if(
                sentence.chinese
            ){

                sentences.push(
                    sentence
                );

                added++;

            }

        });

        saveData();

        renderSentenceList();

        alert(
            `${added}개 문장 업로드 완료`
        );

    };

    reader.readAsText(
        file,
        "UTF-8"
    );

}

// ==========================
// XLSX 업로드
// ==========================

function importExcel(){

    const file =
    document
    .getElementById("excelFile")
    .files[0];

    if(!file){

        alert(
            "엑셀 파일을 선택하세요."
        );

        return;
    }

    const reader =
    new FileReader();

    reader.onload =
    function(e){

        const data =
        new Uint8Array(
            e.target.result
        );

        const workbook =
        XLSX.read(
            data,
            {
                type:"array"
            }
        );

        const sheet =
        workbook.Sheets[
            workbook.SheetNames[0]
        ];

        const rows =
        XLSX.utils.sheet_to_json(
            sheet,
            {
                header:1
            }
        );

        let added = 0;

        rows.forEach(row=>{

            if(
                row.length < 3
            ){
                return;
            }

            const chinese =
            String(
                row[0] || ""
            ).trim();

            const pinyin =
            String(
                row[1] || ""
            ).trim();

            const korean =
            String(
                row[2] || ""
            ).trim();

            if(!chinese){
                return;
            }

            sentences.push({

                id:
                Date.now()
                + Math.random(),

                chinese,

                pinyin,

                korean,

                favorite:false

            });

            added++;

        });

        saveData();

        renderSentenceList();

        alert(
            `${added}개 문장 업로드 완료`
        );

    };

    reader.readAsArrayBuffer(
        file
    );

}

// ==========================
// 데이터 개수 확인
// ==========================

function getSentenceCount(){

    return sentences.length;

}

// ==========================
// 시작
// ==========================

renderSentence();
renderSentenceList();

console.log(
    "총 문장 수:",
    getSentenceCount()
);
