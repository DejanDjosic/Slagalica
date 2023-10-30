<?php
if (isset($_SESSION['session_id'])) {
    echo "<script>alert(\"Već ste ulogovani!\")</script>";
} 
else if (empty($_POST['sifra']) || empty($_POST['mejl'])) {
    echo "<script>alert(\"Morate uneti oba polja!\")</script>";
} else {
    $mejl = $_POST['mejl'];
    $sifra = $_POST['sifra'];

    $query = "SELECT * FROM korisnik WHERE mejl = ? AND sifra = ?";
    $stmt = $connection->prepare($query);
    $stmt->bind_param("ss", $mejl, $sifra);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows == 1) {
        $red = $result->fetch_assoc();
        $_SESSION['session_id'] = 1;
        $_SESSION['korIme'] = $red['ime'];
        $_SESSION['id_korisnika'] = $red['korisnikID'];

        header('Location: /slagalica/index.php');
        exit();
    } else {
        echo "<script>alert(\"Pogrešan mejl ili lozinka!\")</script>";
    }
}
