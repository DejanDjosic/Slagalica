<?php

include('includes/header.php');

$userID = $_SESSION['id_korisnika'];

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Slagalica | Profil</title>
    <link rel="stylesheet" href="assets/style/main.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=DynaPuff&family=Poppins:wght@300;600;700&display=swap" rel="stylesheet">
</head>

<body>
    <div class="main flex" id='profile-main'>
        <header>
            <h1 id='slagalica-naslov'>SLAGALICA</h1>
        </header>

        <div class="wrapper" id='profile-wrapper'>
            <div class="game-container flex" id='profile-game-container'>

                <div class='tables flex-row'>
                    <?php

                    $maxParty = "SELECT p.ukupnoPoena, p.partijaID, r.poeni, r.igraID, p.datum
                    FROM partija p join runda r on r.partijaID=p.partijaID 
                    WHERE p.ukupnoPoena=(SELECT MAX(p.ukupnoPoena) FROM partija) AND r.korisnikID='$userID' 
                    ORDER BY P.ukupnoPoena DESC LIMIT 6";
                    $maxPartyResult = $connection->query($maxParty);
                    $maxPartyRows = $maxPartyResult->fetch_all(MYSQLI_ASSOC);


                    if (isset($maxPartyRows[0])) {
                        $date = $maxPartyRows[0]['datum'];
                        $totalPoints = $maxPartyRows[0]['ukupnoPoena'];
                    }


                    ?>

                    <table border='2px' class='max-igra flex-column'>
                        <tr>
                            <th colspan="8">Najbolje odigrana partija</th>
                        </tr>
                        <tr>
                            <th>Datum</th>
                            <th>Slagalica</th>
                            <th>Moj Broj</th>
                            <th>Skočko</th>
                            <th>Ko zna zna</th>
                            <th>Spojnice</th>
                            <th>Asocijacije</th>
                            <th>Ukupno poena</th>
                        </tr>
                        <tr>
                            <?php if (isset($maxPartyRows[0])) { ?>

                                <td><?php echo $date; ?></td>
                                <?php foreach ($maxPartyRows as $row) { ?>
                                    <td><?php echo $row['poeni']; ?></td>
                                <?php }
                                ?>
                                <td><?php echo $totalPoints; ?></td>
                            <?php } ?>
                        </tr>
                    </table>

                    <table border='2px'>
                        <tr>
                            <th>Datum</th>
                            <th>Naziv igre</th>
                            <th>Broj poena</th>
                        </tr>
                        <?php
                        $points = "SELECT  r.poeni,r.partijaID, r.igraID, i.imeIgre, p.ukupnoPoena, p.datum
                        from runda r join igra i  on r.igraID=i.igraID join partija p on p.partijaID=r.partijaID
                        where r.korisnikID='$userID'
                        order by r.partijaID asc, i.igraID asc ";
                        $result = $connection->query($points);

                        while ($row = $result->fetch_assoc()) {
                            echo "
                        <tr>
                            <td>" . $row['datum'] . "</td>
                            <td>" . $row['imeIgre'] . "</td>
                            <td>" . $row['poeni'] . "</td>
                        </tr>";
                        }
                        ?>
                    </table>

                    <div class='flex side'>
                        <table border='2px' class='max-table'>
                            <tr>
                                <th colspan="2">Maksimalni poeni u igrama</th>
                            </tr>
                            <?php
                            for ($i = 1; $i < 7; $i++) {
                                $maxPointsQuery = "SELECT MAX(r.poeni) as 'maxPoeni', i.imeIgre as 'imeIgre' 
                             FROM runda r JOIN igra i ON i.igraID=r.igraID
                             WHERE r.igraID=$i AND r.korisnikID=$userID";

                                $maxPointsResult = $connection->query($maxPointsQuery);
                                $row = $maxPointsResult->fetch_assoc();
                                echo "
                            <tr>
                                <td>" . $row['imeIgre'] . "</td>
                                <td>" . $row['maxPoeni'] . "</td>
                            </tr>";
                            }

                            ?>
                        </table>
    
                        <form method='post' action='game-menu.php'>
                            <input type='submit' class="cell" value='Povratak u glavni meni'>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>