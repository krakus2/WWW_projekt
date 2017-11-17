  const request = require('request');
  const cheerio = require('cheerio');
  const nl = (process.platform === 'win32' ? '\r\n' : '\n')

  const links = [];
  links.push('http://www.filmweb.pl/2.Shrek')
  links.push('http://www.filmweb.pl/Powrot.Krola')

  request(links[1], function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);

      let obsadaDup = []
      $('table.filmCast.filmCastCast tr td a').each(function(e, element){
        obsadaDup.push($(this).text(),)
      })
      /*obsada = obsada.reduce( (a,b) => {
        if (a.indexOf(b) < 0 ) a.push(b);
        return a;
      },[]);*/
      const obsada = [ ...new Set(obsadaDup) ] //usuwanie duplikatow
      obsada.splice(obsada.indexOf("  "), 1) //usuwanie pustych elementow
      console.log(obsada)
      console.log(nl)

      const opis = $('div.filmPlot').children('p.text').text()
      console.log(opis)
      console.log(nl)

      let rezyser = $('li[itemprop="director"] a').text()
      rezyser = rezyser.replace(/[a-z][A-Z]/g, match => match[0] + ", " + match[1])
      console.log(rezyser)
      console.log(nl)

      let scenarzysta = $('div.filmInfo.bottom-15 table tr').slice(1, 2).text()
      scenarzysta = scenarzysta.replace("scenariusz:", "")
      scenarzysta = scenarzysta.replace(/[a-z][A-Z]/g, match => match[0] + ", " + match[1])
      console.log(scenarzysta)
      console.log(nl)

      let gatunek = $('div.filmInfo.bottom-15 table tr').slice(3, 4).text()
      gatunek = gatunek.replace("gatunek:", "")
      gatunek = gatunek.replace(/[a-z][A-Z]/g, match => match[0] + ", " + match[1])
      console.log(gatunek)
      console.log(nl)

      let kraj_prod = $('div.filmInfo.bottom-15 table tr').slice(4, 5).text()
      kraj_prod = kraj_prod.replace("produkcja:", "")
      kraj_prod = kraj_prod.replace(/[a-z][A-Z]/g, match => match[0] + ", " + match[1])
      console.log(kraj_prod)
      console.log(nl)

      let data_prem = $('div.filmInfo.bottom-15 table tr').slice(5, 6).text()
      data_prem = data_prem.replace("premiera:", "")
      data_prem = data_prem.replace(/[a-z][A-Z]/g, match => match[0] + ", " + match[1]).trim()
      console.log(data_prem)
      console.log(nl)

      let boxOffice = $('div.filmInfo.bottom-15 table tr').slice(6, 7).text()
      boxOffice = boxOffice.replace("boxoffice:", "")
      boxOffice = boxOffice.replace(/top #[1-9]{2}/g, "")
      boxOffice = boxOffice.replace(/[a-z][A-Z]/g, match => match[0] + ", " + match[1]).trim()
      console.log(boxOffice)
      console.log(nl)

      const ocena = $('div.box.nowrap span.vertical-align.light.ratingRateValue span').text()
      console.log(ocena.length)

    }
  });

git init
git add scrape.js
git commit -m "scrap from filmweb ver.1"
git remote add origin https://github.com/krakus2/WWW_projekt.git
git push -u origin master
