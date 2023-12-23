<?php
include('../../includes/connection.php');

if (isset($_POST['dodavanje'])) {
    $ime = $_POST["ime"];
    $mejl = $_POST["mejl"];
    $lozinka1 = $_POST["lozinka1"];
    $lozinka2 = $_POST["lozinka2"];

    $proveraMejla = mysqli_query($connection, "SELECT * FROM korisnik WHERE mejl='$mejl'");
    $brojRedova = mysqli_num_rows($proveraMejla);
    
    if ($brojRedova > 0) {
        echo "<script>alert('Već postoji korisnik sa tim mejlom')</script>";
    } else    if (empty($lozinka1) || empty($lozinka2) || empty($ime) || empty($mejl)) {
        echo "<script>alert('Morate uneti sva polja')</script>";
    } else if ($lozinka1 !== $lozinka2) {
        echo "<script>alert('Polja sa šiframa moraju da se poklapaju')</script>";
    } else {
        if (!preg_match('/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/', $mejl)) {
            echo "<script>alert('Neispravna email adresa')</script>";
        } else {
            $queryMaxID = "SELECT MAX(korisnikID) AS max_id FROM korisnik";
            $resultMaxID = $connection->query($queryMaxID);
            $maxID = $resultMaxID->fetch_assoc();
            $id = ($maxID['max_id'] !== null) ? $maxID['max_id'] + 1 : 1;
            
            $lozinka1=password_hash($lozinka1,PASSWORD_BCRYPT);

            $query = $connection->prepare("INSERT INTO korisnik (korisnikID, mejl, ime, sifra) VALUES (?, ?, ?, ?)");
            $query->bind_param('isss', $id, $mejl, $ime, $lozinka1);

            if ($query->execute()) {
                echo "<script>document.querySelector('.modal').classList.remove('hidden');</script>";
            }
        }
    }
}
