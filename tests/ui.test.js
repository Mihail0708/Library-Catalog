const {test, expect} = require('@playwright/test')

test('Verify "All Books" link is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isLinkVisible = await allBooksLink.isVisible();
    expect(isLinkVisible).toBe(true)
})

test('Verify "Login" button is visible', async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.waitForSelector('nav.navbar');

    const loginButton = await page.$('a[href="/login"]');
    const isLoginButtonVisible = await loginButton.isVisible();
    expect(isLoginButtonVisible).toBe(true)
})

test('Verify "All Books" link is visible after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const allBooksLink = await page.$('a[href="/catalog"]');
    const isAllBooksVisible = await allBooksLink.isVisible();
    expect(isAllBooksVisible).toBe(true)
})

test('Verify "My Books" link is visible after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const myBooksLink = await page.$('a[href="/profile"]');
    const isMyBooksVisible = await myBooksLink.isVisible();
    expect(isMyBooksVisible).toBe(true)
})

test('Verify "Add Book" link is visible after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const addBooksLink = await page.$('a[href="/create"]');
    const isAddBooksVisible = await addBooksLink.isVisible();
    expect(isAddBooksVisible).toBe(true)
})

test('Verify "Email" is visible after login', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    const userEmail = await page.$('//*[@id="user"]/span');
    const isUserEmailVisible = await userEmail.isVisible();
    expect(isUserEmailVisible).toBe(true)
})

test('Login with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    await page.$('a[href="/catalog"]');
    expect(page.url()).toBe('http://localhost:3000/catalog')
})

test('Login with empty input fields', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')
})

test('Login with empty input password field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="email"]', 'peter@abv.bg');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')
})

test('Login with empty input email field', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('input[name="password"]', '123456');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    
    await page.$('a[href="/login"]');
    expect(page.url()).toBe('http://localhost:3000/login')
})

// test('Register with valid credentials', async ({ page }) => {
//     await page.goto('http://localhost:3000/register');
//     await page.fill('input[name="email"]', 'peter2@abv.bg');
//     await page.fill('input[name="password"]', '123456');
//     await page.fill('input[name="confirm-pass"]', '123456');
//     await page.click('input[type="submit"]');

//     await page.$('a[href="/catalog"]');
//     expect(page.url()).toBe('http://localhost:3000/catalog')
// })

test('Register with empty input fields', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('All fields are required!');
        await dialog.accept();
    });
    
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register')
})

test('Register with mismatch password fields', async ({ page }) => {
    await page.goto('http://localhost:3000/register');
    await page.fill('input[name="email"]', 'peter4@abv.bg');
    await page.fill('input[name="password"]', '123456');
    await page.fill('input[name="confirm-pass"]', '789101');
    await page.click('input[type="submit"]');

    page.on('dialog', async dialog => {
        expect(dialog.type()).toContain('alert');
        expect(dialog.message()).toContain('Passwords don\'t match!');
        await dialog.accept();
    });
    
    await page.$('a[href="/register"]');
    expect(page.url()).toBe('http://localhost:3000/register')
})