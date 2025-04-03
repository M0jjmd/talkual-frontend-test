describe('Login en la página de inicio', () => {
    it('debería permitir iniciar sesión con credenciales correctas y redirigir a la página de pedidos', () => {
        cy.visit('http://localhost:3000/');

        cy.get('input#email').type('user@demo.com');
        cy.get('input#password').type('User1234');

        cy.get('button[type="submit"]').click();

        cy.url().should('include', '/orders');

        cy.get('.card').should('exist');
    });

    it('debería mostrar un mensaje de error si las credenciales son incorrectas', () => {
        cy.visit('http://localhost:3000');

        cy.get('input#email').type('wronguser@example.com');
        cy.get('input#password').type('wrongpassword');
        cy.get('form').submit();

        cy.get('button[type="submit"]').click();

        cy.get('div.col-12')
            .contains('p.text-danger', 'Credenciales incorrectas')
            .should('be.visible');
    });
});