<h1 align="center">
  Jedi Order - Backend Ferroviário 🚂
</h1>

<div align="center">
  <p>Backend desenvolvido em <a href="https://nodejs.dev/pt/learn/nodejs-with-typescript/">Node.js</a> com TypeScript </p>
</div>

<h2 align="center">
  Preview do frontend 👁
</h2>
<div align="center">
  <img src="https://github.com/AcademyRethink/backend-jedi-order/assets/124913198/064c24ad-34e4-4c59-ae4a-1c43f590f239" width="300px"/>
  <img src="https://github.com/AcademyRethink/backend-jedi-order/assets/124913198/0ba872ee-9091-4b87-aaa2-4d3acb612efe" width="300px"/>
  <img src="https://github.com/AcademyRethink/backend-jedi-order/assets/124913198/21b7787b-dae7-427c-8823-f625bafcc4bc" width="300px"/>
</div>

# No que consiste o projeto?
<p>O nosso projeto é um Dashboard desenvolvido especificamente para atender às necessidades das empresas siderúrgicas que dependem do modal ferroviário para o transporte de seus produtos. O foco principal do produto é oferecer aos controladores ferroviários uma maneira fácil e simplificada de interpretar dados, permitindo que tomem decisões rápidas e precisas no seu dia a dia.

O produto possui duas funcionalidades principais: um Mapa para controle e gerenciamento em tempo real das locomotivas, e a Análise de falhas através de gráficos para os controladores. Essas funcionalidades visam melhorar a eficiência operacional, reduzir os custos de desenvolvimento de software interno e fornecer segurança nas tomadas de decisão dos responsáveis.</p>

# Documentação do projeto
O projeto está todo documentado <a href="https://www.notion.so/1a26ee60baaf41dd883fcd6a15b53ce9?v=294a95e3e1bc478a85e32819630426b6&pvs=4">aqui</a>, no Notion.

# Pré-requisitos
Antes de executar o projeto, verifique se o seu ambiente atende aos seguintes requisitos:

- Node.js (versão 18.14.0)
- Banco de dados (PostgreSQL): Utilizamos o <a href="https://supabase.com">Supabase</a>
- Outras dependências do projeto podem ser instaladas executando o comando npm install.

# Configuração
Siga as etapas abaixo para configurar o projeto em seu ambiente local:

- Clone este repositório: git clone https://github.com/AcademyRethink/backend-jedi-order.git
- Navegue até o diretório do projeto: cd backend-jedi-order
- Instale as dependências: npm install
- Copie o arquivo de configuração de exemplo e renomeie-o para .env: cp .env.example .env
- Edite o arquivo .env e configure as variáveis de ambiente de acordo com a sua configuração (como detalhes do banco de dados, chaves secretas, etc.).
- Rode o comando npx knex migrate:latest para criar as tabelas no banco de dados.
- Execute o arquivo seedDatabase.ts para preencher as tabelas criadas.

# Executando o projeto
Após a configuração, você pode executar o projeto executando o seguinte comando:
npm start
Isso iniciará o servidor do backend e você poderá acessar as APIs por meio da URL http://localhost:3000.
Também temos uma coleção do Postman onde você pode acessar todos os endpoints. Para acessá-lo, clique <a href="https://drive.google.com/file/d/1ATF1K1j93ZfEednLOWLuGc9qBAYmyToi/view?usp=sharing">aqui</a>.

# Testes
Para executar os testes unitários, utilize o seguinte comando:
npm test
Os testes verificarão a funcionalidade e integridade do backend.

Para verificar a cobertura dos testes, utilize o seguinte comando:
npx jest --coverage

# Languages / Frameworks / Libs 💻
 - TypeScript
 - Node.js
 - Express
 - Knex
 - Jest
 - Yup
 - JWT

# Squad 🚀
<div align="center">
  <img src="https://github.com/AcademyRethink/backend-jedi-order/assets/124913198/e178676a-77ec-455f-8570-aab8b8852eab" alt="Imagem Amanda" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-jedi-order/assets/124913198/9f3431e5-9293-4350-b832-13a48efa1f31" alt="Imagem Andre" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-jedi-order/assets/124913198/710a0bea-9a16-42c6-9be7-2be7b4dfaac0" alt="Imagem Caio" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-jedi-order/assets/124913198/2bfd8696-3ea8-4de8-a2a0-1c71082ba128" alt="Imagem Daniela" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-jedi-order/assets/124913198/1c573eaf-4616-4324-b4d5-879b9b98bd8c" alt="Imagem Juliana" width="60" height="60">
  <img src="https://github.com/AcademyRethink/backend-jedi-order/assets/124913198/ede58c61-bf20-4826-aa25-59355d1e0d56" alt="Imagem Luiz" width="60" height="60">
</div>
<div align="center">
Amanda - André - Caio - Daniela - Juliana - Luiz
</div>
