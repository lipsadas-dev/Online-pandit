function bookPuja() {
    alert("Puja booked successfully!");
}
function bookPuja() {

    const puja = document.querySelector("select").value;
    const date = document.querySelector('input[type="date"]').value;

    localStorage.setItem("puja", puja);
    localStorage.setItem("date", date);

    alert("Booking Saved!");
}
fetch("/user")
.then(res => res.json())
.then(data => {
    console.log(data);

    document.getElementById("name").value = data[0].fullname;
    document.getElementById("phone").value = data[0].mobile;
});