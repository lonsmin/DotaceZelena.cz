# DotaceZelena.cz
Je menší projekt na získávání kontaktních údajů od oslovených uživatelů. Po vyplnění udajů pošle přes nastavenou domenu e-mail s vypisem získaných údajů.

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
## Parametry
V souboru [parametry.json](https://github.com/lonsmin/DotaceZelena.cz/blob/main/parametry.json) je možné přidat nebo odebrat libovolné množství formulářů.

V zakladn.checbox jsou vytvořeny checkboxy, které po zakliknutí spouští cyklus na rozšíření o další parametry, které se načítají z rozsireny.checkbox a to podle pořadí v poli [0] patří k [0]
