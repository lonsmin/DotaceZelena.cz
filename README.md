# DotaceZelena.cz
Je menší projekt na získávání kontaktních údajů od oslovených uživatelů.

## Vlastní nastavení
V souboru send.php si nastavte vlastní e-mail

```PHP
$my_email = 'name@mydomain.cz';
```
hned pod tím je nastaveí hlavičky e-mailu

```PHP
$header = "From: admin@lonsmin.cz\r\n"; 
$header.= "Reply-To: ".$_POST["email"]."\r\n";
$header.= "MIME-Version: 1.0\r\n"; 
$header.= "Content-Type: text/html; charset=utf-8\r\n";
```
