document.addEventListener("DOMContentLoaded", () => {
    // ======= Variabel =======
    const rankCards = document.querySelectorAll(".rank-card");
    const paymentCards = document.querySelectorAll(".payment-card");
    const jumlahInput = document.getElementById("jumlah");
    const totalAmount = document.getElementById("totalAmount");
    const selectedPackage = document.getElementById("selectedPackage");

    const productSection = document.querySelector(".product-section"); // target scroll
    let currentPrice = 0;
    let selectedRankPrice = 0;
    let selectedPayment = "-";

    // ======= Fungsi Animasi Angka Total =======
    const animateNumber = (from, to, duration = 500) => {
        let start = null;
        const step = (timestamp) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const value = Math.floor(progress * (to - from) + from);
            totalAmount.textContent = "Rp" + value.toLocaleString("id-ID");
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    // ======= Update Total Harga =======
    const updateTotal = () => {
        const jumlah = parseInt(jumlahInput.value) || 1;
        const newPrice = selectedRankPrice * jumlah;
        animateNumber(currentPrice, newPrice);
        currentPrice = newPrice;
    };

    // ======= Update Keterangan Paket =======
    const updatePaymentInfo = () => {
        const nominal = document.querySelector(".rank-card.selected .rank-title")?.innerText || "-";
        selectedPackage.textContent = nominal;
    };

    // ======= Pilih Rank =======
    rankCards.forEach((card) => {
        card.addEventListener("click", () => {
            selectedRankPrice = parseInt(
                card.querySelector(".rank-price").textContent.replace(/\D/g, "")
            ) || 0;

            rankCards.forEach((c) => c.classList.remove("selected"));
            card.classList.add("selected");

            updateTotal();
            updatePaymentInfo();

            // ⬇️ Auto scroll ke jumlah & payment
            productSection.scrollIntoView({ behavior: "smooth" });
        });
    });

    // ======= Tombol + / - =======
    window.increaseQuantity = () => {
        jumlahInput.value = parseInt(jumlahInput.value) + 1;
        updateTotal();
        updatePaymentInfo();
    };

    window.decreaseQuantity = () => {
        if (parseInt(jumlahInput.value) > 1) {
            jumlahInput.value = parseInt(jumlahInput.value) - 1;
            updateTotal();
            updatePaymentInfo();
        }
    };

    // ======= Pilih Metode Pembayaran =======
    paymentCards.forEach((card) => {
        card.addEventListener("click", () => {
            paymentCards.forEach((c) => c.classList.remove("selected"));
            card.classList.add("selected");
            selectedPayment = card.querySelector(".payment-title")?.innerText || "-";
        });
    });

    // ======= Kirim ke WhatsApp =======
    window.sendToWhatsApp = () => {
        const nama = document.querySelector("input[name='nama']")?.value || "-";
        const loginVia = document.querySelector("select[name='login_via']")?.value || "-";
        const akunId = document.querySelector("input[name='akun_id']")?.value || "-";
        const nickname = document.querySelector("input[name='nickname']")?.value || "-";
        const email = document.querySelector("input[name='email']")?.value || "-";
        const password = document.querySelector("input[name='password']")?.value || "-";
        const heroReq = document.querySelector("input[name='hero']")?.value || "-";
        const catatan = document.querySelector("input[name='catatan']")?.value || "-";

        const nominal = document.querySelector(".rank-card.selected .rank-title")?.innerText || "-";
        const jumlah = parseInt(jumlahInput.value) || 1;
        const hargaPerPaket = parseInt(
            document.querySelector(".rank-card.selected .rank-price")?.textContent.replace(/\D/g, "")
        ) || 0;
        const totalHarga = hargaPerPaket * jumlah;

        const message = `Halo admin Raynn Point Saya ingin melakukan pemesanan *(Joki Mobile Legend Id)* 
*1. Data Akun:* 
- Nama: ${nama} 
- Login via: ${loginVia} 
- User ID: ${akunId} 
- Nickname: ${nickname} 
- Email/No. HP/Moonton ID: ${email} 
- Password: ${password} 
- Request Hero: ${heroReq} 
- Catatan: ${catatan} 
*2. Pesanan:* 
- Nominal: ${nominal} 
- Jumlah: ${jumlah} 
- Harga: Rp${totalHarga.toLocaleString("id-ID")} 
*3. Pembayaran:* 
- Metode: ${selectedPayment} 

Mohon dibantu proses jokinya kak, saya tunggu konfirmasi selanjutnya. Terima kasih banyak`;

        const encodedMessage = encodeURIComponent(message);
        const phoneNumber = "6287788722325";
        const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
        window.open(waUrl, "_blank");
    };
});

// ======= Overlay Help =======
document.addEventListener("DOMContentLoaded", () => {
    const helpBtn = document.getElementById("helpBtn");
    const helpOverlay = document.getElementById("helpOverlay");
    const closeOverlay = document.getElementById("closeOverlay");

    const showOverlay = () => {
        helpOverlay.style.display = "flex";
    };

    const hideOverlay = () => {
        helpOverlay.style.display = "none";
        localStorage.setItem("overlaySeen", "true");
    };

    helpBtn.addEventListener("click", showOverlay);
    closeOverlay.addEventListener("click", hideOverlay);
    helpOverlay.addEventListener("click", e => {
        if (e.target === helpOverlay) hideOverlay();
    });

    if (!localStorage.getItem("overlaySeen")) {
        showOverlay();
    }
});