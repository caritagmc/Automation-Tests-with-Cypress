///<reference types = "cypress"/>
import{format} from '../support/utils'



context('Dev Finance Agilizei', () => {


beforeEach(() => {

  cy.visit('https://dev-finance.netlify.app/') 
  cy.get('data-table tbody tr').should('have.length',0)

})

it('Cadastrar Entradas', () => {

 cy.get('#transaction .button').click() 

 cy.get('#description').type('Mesada') 

 cy.get('[name = amount]').type(12)

 cy.get('[type="date"]').type('2021-03-21') 

 cy.get('button').contains('Salvar').click()

});

it('Cadastrar Saídas', () => {

 
  cy.get('#transaction .button').click() 
 
  cy.get('#description').type('Mesada') 
 
  cy.get('[name = amount]').type(-20)
 
  cy.get('[type="date"]').type('2021-03-23') 
 
  cy.get('button').contains('Salvar').click()
 
 });

 it('Remover', () => {

  const entrada = 'mesada'
  const saida = 'ovo'

 //entrada
  cy.get('#transaction .button').click() 
 
  cy.get('#description').type(entrada) 
 
  cy.get('[name = amount]').type(30)
 
  cy.get('[type="date"]').type('2021-03-23') 
 
  cy.get('button').contains('Salvar').click()

  //saida

  cy.get('#transaction .button').click() 
 
  cy.get('#description').type(saida) 
 
  cy.get('[name = amount]').type(-20)
 
  cy.get('[type="date"]').type('2021-03-23') 
 
  cy.get('button').contains('Salvar').click()

  //estratégia 1: voltar para o elemento pai, e avançar para um td img attr

  cy.get('td.description')
    .contains(entrada)
    .parent()
    .find('img[onclick="Transaction.remove(0)"]')
    .click()

  //estratégia 2: buscar todos os irmãos, buscar o que tem um img+attr

  cy.get('td.description')
    .contains(saida)
    .siblings()
    .children('img[onclick="Transaction.remove(0)"]')
    .click()
 
 });

 let incomes = 0
 let expenses = 0

 it.only('Lista', () => {
  const entrada = 'mesada'
  const saida = 'ovo'

 //entrada
  cy.get('#transaction .button').click() 
 
  cy.get('#description').type(entrada) 
 
  cy.get('[name = amount]').type(50)
 
  cy.get('[type="date"]').type('2021-03-23') 
 
  cy.get('button').contains('Salvar').click()

  //saida

  cy.get('#transaction .button').click() 
 
  cy.get('#description').type(saida) 
 
  cy.get('[name = amount]').type(-10)
 
  cy.get('[type="date"]').type('2021-03-23') 
 
  cy.get('button').contains('Salvar').click()

   //Capturar o texto do total
   //Comparar o somatório de entradas e despesas com o total

  cy.get('#data-table tbody tr')
    .each(($el,index,$list)=> {

      cy.get($el).find('td.income, td.expense').invoke('text').then(text => {

            if(text.includes('-')){

              expenses = expenses + format(text)
            } else{
              incomes = incomes + format(text)
            }

            cy.log('entradas', incomes)
            cy.log('saidas', expenses)

          })
      })

      cy.get('#totalDisplay').invoke('text').then(text => {
        let formattedTotalDisplay = format(text)
        let expectedTotal = incomes + expenses

        expect(formattedTotalDisplay).to.eq(expectedTotal)


      })



 });




});