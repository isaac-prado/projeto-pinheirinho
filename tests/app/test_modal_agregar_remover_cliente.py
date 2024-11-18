from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest

class TestModalAgregarCliente(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()
        self.driver.get("http://localhost:3000")
        
    def test_abrir_agregar_cliente_modal(self):
        add_button = self.driver.find_element(By.XPATH, "//button[text()='Adicionar Cliente']")
        add_button.click()
        
        modal_title = self.driver.find_element(By.XPATH, "//h2[text()='Adicionar Cliente']")
        self.assertTrue(modal_title.is_displayed(),"O modal não se mostra")
        
    def test_formulario_completado_corretamente(self):
        
        self.test_abrir_agregar_cliente_modal()
        
        cpf_field = self.driver.find_element(By.NAME, "cpf")
        cpf_field.send_keys("12345678901")
        
        name_field = self.driver.find_element(By.NAME, "nome")
        name_field.send_keys("John Doe")
        
        address_field = self.driver.find_element(By.NAME, "endereco")
        address_field.send_keys("123 Main St")
        
        phone_field = self.driver.find_element(By.NAME, "telefone")
        phone_field.send_keys("1234567890")
        
        submit_button = self.driver.find_element(
            By.CSS_SELECTOR,
            "button .MuiSvgIcon-root[style='color: green;']"
        )
        submit_button.click()
        
        page_title = self.driver.find_element(By.XPATH, "//h6[text()='Gestão de assinaturas']")
        self.assertTrue(page_title.is_displayed(),"O Titulo da página não se mostra, pelo qual não foi possível voltar do modal. Erro no submit")
        
    def teste_remover_cliente(self):
        add_button = self.driver.find_element(By.XPATH, "//button[text()='Remover Cliente']")
        add_button.click()
        
        cpf_field = self.driver.find_element(By.NAME, "cpf")
        cpf_field.send_keys("123.456.789-00")
        
        submit_button = self.driver.find_element(
            By.CSS_SELECTOR,
            "button .MuiSvgIcon-root[style='color: green;']"
        )
        submit_button.click()
        try:
            WebDriverWait(self.driver, 10).until(
                EC.invisibility_of_element_located((By.XPATH, "//td[text()='John']"))
            )
            print("O cliente tem sido removido com sucesso.")
        except:
            self.fail("O cliente não foi removido.")
        

        
if __name__ == "__main__":
    unittest