﻿import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    encapsulation: ViewEncapsulation.None
})

export class AppComponent {
    source: any =
    {
        datatype: 'csv',
        datafields: [
            { name: 'Date' },
            { name: 'S&P 500' },
            { name: 'NASDAQ' }
        ],
        url: '../sampledata/nasdaq_vs_sp500.txt'
    };

    dataAdapter: any = new jqx.dataAdapter(this.source);

    columns: any[] =
    [
        { text: 'Date', datafield: 'Date', cellsformat: 'd', width: 250 },
        { text: 'S&P 500', datafield: 'S&P 500', width: 150 },
        { text: 'NASDAQ', datafield: 'NASDAQ' }
    ];

    data: string = '[{ "CompanyName": "Alfreds Futterkiste", "ContactName": "Maria Anders", "ContactTitle": "Sales Representative", "ContactAddress": "Obere Str. 57", "City": "Berlin", "Country": "Germany" }, { "CompanyName": "Ana Trujillo Emparedados y helados", "ContactName": "Ana Trujillo", "ContactTitle": "Owner", "ContactAddress": "Avda. de la Constitucin 2222", "City": "Mxico D.F.", "Country": "Mexico" }, { "CompanyName": "Antonio Moreno Taquera", "ContactName": "Antonio Moreno", "ContactTitle": "Owner", "ContactAddress": "Mataderos 2312", "City": "Mxico D.F.", "Country": "Mexico" }, { "CompanyName": "Around the Horn", "ContactName": "Thomas Hardy", "ContactTitle": "Sales Representative", "ContactAddress": "120 Hanover Sq.", "City": "London", "Country": "UK" }, { "CompanyName": "Berglunds snabbkp", "ContactName": "Christina Berglund", "ContactTitle": "Order Administrator", "ContactAddress": "Berguvsvgen 8", "City": "Lule", "Country": "Sweden" }, { "CompanyName": "Blauer See Delikatessen", "ContactName": "Hanna Moos", "ContactTitle": "Sales Representative", "ContactAddress": "Forsterstr. 57", "City": "Mannheim", "Country": "Germany" }, { "CompanyName": "Blondesddsl pre et fils", "ContactName": "Frdrique Citeaux", "ContactTitle": "Marketing Manager", "ContactAddress": "24, place Klber", "City": "Strasbourg", "Country": "France" }, { "CompanyName": "Blido Comidas preparadas", "ContactName": "Martn Sommer", "ContactTitle": "Owner", "ContactAddress": "C\/ Araquil, 67", "City": "Madrid", "Country": "Spain" }, { "CompanyName": "Bon app\'", "ContactName": "Laurence Lebihan", "ContactTitle": "Owner", "ContactAddress": "12, rue des Bouchers", "City": "Marseille", "Country": "France" }, { "CompanyName": "Bottom-Dollar Markets", "ContactName": "Elizabeth Lincoln", "ContactTitle": "Accounting Manager", "ContactAddress": "23 Tsawassen Blvd.", "City": "Tsawassen", "Country": "Canada" }, { "CompanyName": "B\'s Beverages", "ContactName": "Victoria Ashworth", "ContactTitle": "Sales Representative", "ContactAddress": "Fauntleroy Circus", "City": "London", "Country": "UK" }, { "CompanyName": "Cactus Comidas para llevar", "ContactName": "Patricio Simpson", "ContactTitle": "Sales Agent", "ContactAddress": "Cerrito 333", "City": "Buenos Aires", "Country": "Argentina" }, { "CompanyName": "Centro comercial Moctezuma", "ContactName": "Francisco Chang", "ContactTitle": "Marketing Manager", "ContactAddress": "Sierras de Granada 9993", "City": "Mxico D.F.", "Country": "Mexico" }, { "CompanyName": "Chop-suey Chinese", "ContactName": "Yang Wang", "ContactTitle": "Owner", "ContactAddress": "Hauptstr. 29", "City": "Bern", "Country": "Switzerland" }, { "CompanyName": "Comrcio Mineiro", "ContactName": "Pedro Afonso", "ContactTitle": "Sales Associate", "ContactAddress": "Av. dos Lusadas, 23", "City": "Sao Paulo", "Country": "Brazil" }, { "CompanyName": "Consolidated Holdings", "ContactName": "Elizabeth Brown", "ContactTitle": "Sales Representative", "ContactAddress": "Berkeley Gardens 12 Brewery", "City": "London", "Country": "UK" }, { "CompanyName": "Drachenblut Delikatessen", "ContactName": "Sven Ottlieb", "ContactTitle": "Order Administrator", "ContactAddress": "Walserweg 21", "City": "Aachen", "Country": "Germany" }, { "CompanyName": "Du monde entier", "ContactName": "Janine Labrune", "ContactTitle": "Owner", "ContactAddress": "67, rue des Cinquante Otages", "City": "Nantes", "Country": "France" }, { "CompanyName": "Eastern Connection", "ContactName": "Ann Devon", "ContactTitle": "Sales Agent", "ContactAddress": "35 King George", "City": "London", "Country": "UK" }, { "CompanyName": "Ernst Handel", "ContactName": "Roland Mendel", "ContactTitle": "Sales Manager", "ContactAddress": "Kirchgasse 6", "City": "Graz", "Country": "Austria"}]';

    source2: any =
    {
        datatype: 'json',
        datafields: [
            { name: 'CompanyName', type: 'string' },
            { name: 'ContactName', type: 'string' },
            { name: 'ContactTitle', type: 'string' },
            { name: 'Address', type: 'string' },
            { name: 'City', type: 'string' },
            { name: 'Country', type: 'string' }
        ],
        localdata: this.data
    };

    dataAdapter2: any = new jqx.dataAdapter(this.source2);

    columns2: any[] =
    [
        { text: 'Company Name', datafield: 'CompanyName', width: 250 },
        { text: 'Contact Name', datafield: 'ContactName', width: 150 },
        { text: 'Contact Title', datafield: 'ContactTitle', width: 180 },
        { text: 'City', datafield: 'City', width: 120 },
        { text: 'Country', datafield: 'Country' }
    ];
}