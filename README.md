# DotaceZelena.cz
Je menší projekt na získávání kontaktních údajů od oslovených uživatelů. Po vyplnění udajů pošle přes nastavenou doménu e-mail s výpisem získaných údajů.

## Vlastní nastavení
V souboru [send.php](https://github.com/lonsmin/DotaceZelena.cz/blob/main/send.php) si nastavte vlastní e-mail

```PHP
$my_email = 'name@mydomain.cz';
```
hned pod tím je nastavení hlavičky e-mailu

```PHP
$header = "From: admin@lonsmin.cz\r\n"; 
$header.= "Reply-To: ".$_POST["email"]."\r\n";
$header.= "MIME-Version: 1.0\r\n"; 
$header.= "Content-Type: text/html; charset=utf-8\r\n";
```
## Parametry
V souboru [parametry.json](https://github.com/lonsmin/DotaceZelena.cz/blob/main/parametry.json) je možné přidat nebo odebrat libovolné množství formulářů.

V zakladni.checbox jsou vytvořeny checkboxy, které po zaškrtnutí spouští cyklus na rozšíření o další parametry, které se načítají z rozsireny.checkbox, rozsireny.input a rozsireny.select jsou k sobě svázany podle pořadí v poli zakladni[0] patří k rozsireny[0]
