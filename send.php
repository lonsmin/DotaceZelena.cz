<?php
$my_email = 'majacom2@gmail.com';

$header = "From: admin@lonsmin.cz\r\n"; 
$header.= "Reply-To: ".$_POST["email"]."\r\n";
$header.= "Bcc: majacom2@gmail.com\r\n";
$header.= "MIME-Version: 1.0\r\n"; 
$header.= "Content-Type: text/html; charset=utf-8\r\n";

$message = '<!DOCTYPE html>
		<html>
		<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">		
		</head>			
		<body>';

$message = '<strong>Vaše stránka získala tyto údaje: <strong>';

$alertDone = "Děkujeme, vše proběhlo v pořádku.";
$alertErrorTelOrEm = "Vyplňte prosím alespoň email nebo telefonní číslo";

if($_POST['Podrobny_formular'] === "Ne"){
	if($_POST['email'] != "" || $_POST['telefon'] !="")
	{	
		foreach ($_POST as $key => $value) {
			$message = $message.'<br>'.$key.': '.$value;
		}
		$message.='
		</body>
		</html>';
		mail($my_email,'lonsmin.cz',$message, $header);
		echo $alertDone;
	}
	else{
		echo $alertErrorTelOrEm;
	}
}
elseif($_POST['Podrobny_formular'] === "Ano")
{
	if($_POST['email'] != "" || $_POST['telefon'] !="")
	{	
		foreach ($_POST as $key => $value) {
			
				$message = $message.'<br>'.$key.': '.$value;
			
			
			
		}
		$message.='
		</body>
		</html>';
	//print_r($_POST);
	mail($my_email,'lonsmin.cz',$message, $header);
    echo $alertDone;
	}
	else{
		echo $alertErrorTelOrEm;
	}
}
?>