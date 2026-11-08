import { expect, test } from '@playwright/test'

const viewports = [
  { name: 'mobile-320', width: 320, height: 800 },
  { name: 'mobile-375', width: 375, height: 812 },
  { name: 'tablet-768', width: 768, height: 900 },
  { name: 'desktop-1024', width: 1024, height: 900 },
  { name: 'desktop-1440', width: 1440, height: 1000 },
]

for (const viewport of viewports) {
  test(`não há overflow horizontal em ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({
      width: viewport.width,
      height: viewport.height,
    })
    await page.goto('/')

    await expect(
      page.getByRole('heading', { level: 1, name: /Matheus Issler/i }),
    ).toBeVisible()

    const overflow = await page.evaluate(
      () =>
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
    )

    expect(overflow).toBeLessThanOrEqual(1)
  })
}

test('menu hambúrguer abre, navega e fecha no mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')

  const openButton = page.getByRole('button', { name: 'Abrir menu' })
  await expect(openButton).toBeVisible()
  await openButton.click()

  const menu = page.getByRole('dialog', { name: 'Menu de navegação' })
  await expect(menu).toBeVisible()

  await menu.getByRole('link', { name: /Sobre/i }).click()
  await expect(menu).toBeHidden()
  await expect(page).toHaveURL(/#sobre$/)
})

test('navegação desktop fica visível e o hambúrguer some', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.goto('/')

  await expect(
    page.getByRole('navigation', { name: 'Navegação principal' }),
  ).toBeVisible()
  await expect(
    page.getByRole('button', { name: 'Abrir menu' }),
  ).toBeHidden()
})

test('páginas de projeto e paginador funcionam', async ({ page }) => {
  await page.goto('/projects/projeto-01')

  await expect(
    page.getByRole('heading', { level: 1, name: 'AzuraAPI' }),
  ).toBeVisible()

  await page.getByRole('link', { name: /Próximo/i }).click()
  await expect(
    page.getByRole('heading', { level: 1, name: 'Mini Blog' }),
  ).toBeVisible()
})

test('formulário responde ao envio sem depender da chave configurada', async ({
  page,
}) => {
  // Isola o teste da chave real em .env.local: sem rede externa, o envio
  // termina em sucesso (chave presente) ou no aviso de configuração (ausente).
  await page.route('https://api.staticforms.dev/**', (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: '{}' }),
  )

  await page.goto('/#contato')

  const form = page.locator('.contact-form')
  await form.getByLabel('Nome').fill('Matheus')
  await form.getByLabel('E-mail').fill('matheus@example.com')
  await form.getByLabel('Mensagem').fill('Mensagem de teste')
  await form.getByRole('button', { name: /Enviar mensagem/i }).click()

  await expect(
    page.getByText(/Mensagem enviada com sucesso|VITE_STATIC_FORMS_KEY/),
  ).toBeVisible()
})
