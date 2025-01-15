Szkolny sklepik - Adrian Szmandra 4AP


Cel projektu
Ułatwienie zarządzania sprzedażą oraz umożliwienie uczniom przeglądania i zamawiania produktów dostępnych w sklepiku szkolnym. (Interfejs użytkownika i administratora)

główne komponenty projektu:
- App() - logowanie/rejestracja oraz nagłówek, nawigacja, stopka
- Navbar() - nawigacja służąca do oddzielenia kategorii produktów 
- ProductList() - lista produktów ściągnięta z bazy danych
- ProductCard() - pojedyncza karta produktu 
- ProductForm() - komponent służący do edytowania produktu przez administratora 
- Cart() - Koszyk podsumowujący co użytkownik chce kupić


Endpointy:
- app.post("/register") - Dodanie nowego użytkownika do bazy danych (hashowanie hasła)
- app.post(“/login”) - Sprawdzenie czy użytkownik o danych Loginie i Haśle istnieje, jeżeli tak logowanie powiodło się
- app.put(“/products/:id”) - Zaktualizowanie informacji o produkcie 
- app.post(“products”) - dodanie nowego produktu do bazy danych
- app.get(“products”) - wyciągnięcie rekordów z bazy i ich wyświetlenie 

Najważniejsze Funkcje/Metody:
- fetchProducts() - pobieranie produktów z bazy danych (Endpoint - app.get(“products”))
- handleSave() - dodanie bądź zaktualizowanie produktu do bazy danych (Endpointy - app.put(“/products/:id”) / app.post(“products”))


Zmienne:
- isLogin - wartość logiczna przechowująca czy użytkownik się zalogował aby następnie przejść do dalszej części strony 
- isAdmin - wartość logiczna przechowująca czy osoba która się zalogowała jest administratorem
- category - Wybraną kategorie produktów, jeśli wartość pusta - wyświetl wszyskie produkty 
- products - Produkty do wyświetlenia 
- IsEditing - wartość logiczna przechowująca czy karta jest edytowana przez administratora 
- productsCart - tablica produktow ktore użytkownik dodał do koszyka 



Wartości jakie należy wpisać do formularza z nowym produktem lub aktualizacją:
nazwa 
opis
cena
ścieżka URL obrazka - (zapisać zdjęcie w public/product_images)
ilość 
kategoria (wybranie spośród trzech - food, drink, accessory


Przejście po projekcie:
Na starcie strony użytkownik musi się zalogować bądź założyć konto jeżeli takowego nie posiada, następnie jeżeli użytkownik jest zwykłym uczniem widzi produkty które może zakupić poprzez dodanie je do koszyka, jeżeli loguje się administrator w miejsce przycisku kupna, znajdzie się przycisk do edycji produktu. Administrator również posiada dodatkową kartę która służy do tworzenia nowych produktów.W widoku użytkownika, po kliknięciu w ikonę koszyka (w prawym górnym rogu) wyświetli się podsumowanie zakupów 

Projekt został postawiony przez framework React’a - Vite 
Aplikacja posiada bazę danych MySQL postawioną przez narzędzie Docker Compose i jest zarządzana przez node.js oraz express

Konta założone do sprawdzania widoku:
- użytkownika - Login: casual_user Hasło: 123
- administratora- Login: admin         Hasło: admin123


struktura projektu:
-school-shop
	- backend
		-index.js
	- frontend 
		-(react)
	- docker-compose.yml


aby dodać zdjecie produktu trzeba najpierw wrzucić je do folderu public/product_images, a nastepnie przy podawaniu image_url podać zgodną nazwę ze zdjęciem

Uruchomienie projektu (ścieżka -> komenda):
/school-shop -> docker compose -up
/backend -> node index.js
/frontend -> npm run dev


	



Adrian Szmandra 4AP











