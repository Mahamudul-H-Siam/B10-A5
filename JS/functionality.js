document.getElementById('blog').addEventListener('click', function () {
    window.location.href = "blog.html";
})
function getBalanceByElement(element) {
    return Number(element.innerText);
}

let totalBalance = Number(document.getElementById("balance").innerText);
let allEachBalance = document.querySelectorAll(".each-balance");
let donationCards = document.querySelectorAll(".donation-card");
let donationInputs = document.querySelectorAll(".donate-input");
let donationBtns = document.querySelectorAll(".donate-btn");

function isDonationSuccessful(inputBalance) {
    if (inputBalance <= 0 || inputBalance > totalBalance) {
        return false;
    }
    else return true;
}

function setHistory(donatedAmount, donatedTo, time) {
    let html = `
    <div class="border rounded-xl mb-6 p-6">
                <h1 class="font-semibold text-xl mb-3 text-donate-primary lg:text-start">${donatedAmount} Taka is Donated ${donatedTo}</h1>
                <p class="font-light text-base mb-6 text-donate-secondary">
                Date : ${time}
                </p>
            </div>
    `
    document.getElementById("history-section").innerHTML += html;
}
function donate(evt, idx) {
    console.log("event target: ", evt.target);
    console.log("donation btn: ", donationBtns[idx]);
    if (evt.target === donationBtns[idx]) {
        let inputBalance = Number(donationInputs[idx].value);
        if (!isNaN(inputBalance)) {
            if (isDonationSuccessful(inputBalance)) {
                let eachBalance = getBalanceByElement(allEachBalance[idx]);
                eachBalance += inputBalance;
                allEachBalance[idx].innerText = eachBalance;
                totalBalance -= inputBalance;
                document.getElementById("balance").innerText = totalBalance;
                let donatedTo = donationCards[idx].querySelector(".donated-to").innerText;
                let time = new Date();
                setHistory(inputBalance, donatedTo, time);
                my_modal_5.showModal();
            } else {
                alert("Invalid Donation Amount");
            }
        }
        else {
            alert("Invalid Donation Amount");
        }
        donationInputs[idx].value = "";
    }
}

for (let i = 0; i < donationCards.length; i++) {
    donationCards[i].addEventListener('click', function (evt) {
        donate(evt, i);
    })
}
let donationActive = true;
function changeDonationHistoryStyle(str1, str2) {
    document.getElementById(str1).classList.remove("bg-white");
    document.getElementById(str1).classList.add("bg-btn-color");
    document.getElementById(str1).classList.add("hover:bg-btn-color");
    document.getElementById(str2).classList.remove("bg-btn-color");
    document.getElementById(str2).classList.add("bg-white");
    document.getElementById(str2).classList.remove("hover:bg-btn-color");
   
    let donationSection = document.getElementById("donation-section");
    let historySection = document.getElementById("history-section");
    console.log('hi');
    if (str1 === "donation") {
        console.log('see donation');
        donationActive = true;
        donationSection.classList.remove("hidden");
        donationSection.classList.add("flex");
        historySection.classList.remove('grid');
        historySection.classList.add('hidden');
    }
    else {
        console.log('see history');
        donationActive = false;
        historySection.classList.remove("hidden");
        historySection.classList.add("grid"); // flex
        donationSection.classList.remove('flex');
        donationSection.classList.add('hidden');
    }
}
function donationHistoryToggle(e) {
    if (e.target === document.getElementById("donation")) { 
        console.log('donation');
        if (!donationActive) { 
            changeDonationHistoryStyle("donation", "history");
        }
    }
    else {
        console.log('history');
        if (donationActive) {
            changeDonationHistoryStyle("history", "donation");
        }
    }
}

document.getElementById("donation").addEventListener('click', function (e) {
    donationHistoryToggle(e);
});