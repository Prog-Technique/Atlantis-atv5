const cassandra = require('cassandra-driver');
const { v4: uuidv4 } = require('uuid');

const client = new cassandra.Client({
  cloud: { 
    secureConnectBundle: "./secure-connect-fatec.zip" 
  },
  credentials: { 
    username: "oYTLdYQAIbWdDCOBetteGknG", 
    password: "QAyu3h2AvKrvxGbsKK3Cd2ZZIOm4moHrqcyosj0cKm5_7jp3QtNs9f5AicguM_P+ALSMIyh-sKzoiIZ2DQeLS7PpZIu_c0m4CtBeJZfX,kh5vEsNAkT.,T+XJUz27DvQ" 
  },
  keyspace: "atlantis"
});

async function criarTabelaClientes() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.clientes (id uuid PRIMARY KEY, nome text, nome_social text, nascimento date, cadastro date, titular boolean);";
  return client.execute(query);
}

async function criarTabelaEndereco() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.endereco (id uuid PRIMARY KEY, id_cliente uuid, cep text, numero text, locadouro text, cidade text, estado text, pais text, bairro text);";
  return client.execute(query);
}

async function criarIndiceEnderecoCliente() {
  const query = "CREATE INDEX IF NOT EXISTS id_endereco_cli ON atlantis.endereco (id_cliente);";
  return client.execute(query);
}

async function criarTabelaClienteDependente() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.cliente_dependente (id uuid PRIMARY KEY, id_cliente uuid, id_dependente uuid);";
  return client.execute(query);
}

async function criarIndiceIdClienteDependente() {
  const query = "CREATE INDEX IF NOT EXISTS id_depen_cli ON atlantis.cliente_dependente (id_cliente);";
  return client.execute(query);
}

async function criarIndiceClienteIdDependente() {
  const query = "CREATE INDEX IF NOT EXISTS id_cli_depen ON atlantis.cliente_dependente (id_dependente);";
  return client.execute(query);
}

async function criarTabelaTelefones() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.telefones (id uuid PRIMARY KEY, numero text);";
  return client.execute(query);
}

async function criarTabelaClienteTelefone() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.cliente_telefone (id uuid PRIMARY KEY, id_cliente uuid, id_telefone uuid);";
  return client.execute(query);
}

async function criarIndiceIdClienteTelefone() {
  const query = "CREATE INDEX IF NOT EXISTS id_cliente_cli_tell ON atlantis.cliente_telefone (id_cliente);";
  return client.execute(query);
}

async function criarIndiceClienteIdTelefone() {
  const query = "CREATE INDEX IF NOT EXISTS id_tell_cli_tell ON atlantis.cliente_telefone (id_telefone);";
  return client.execute(query);
}

async function criarTabelaDocs() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.docs (id uuid PRIMARY KEY, tipo text, numero text, emissao date);";
  return client.execute(query);
}

async function criarTabelaClienteDoc() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.cliente_doc (id uuid PRIMARY KEY, id_cliente uuid, id_doc uuid);";
  return client.execute(query);
}

async function criarIndiceIdClienteDoc() {
  const query = "CREATE INDEX IF NOT EXISTS id_cliente_cli_doc ON atlantis.cliente_doc (id_cliente);";
  return client.execute(query);
}

async function criarIndiceClienteIdDoc() {
  const query = "CREATE INDEX IF NOT EXISTS id_doc_cli_doc ON atlantis.cliente_doc (id_doc);";
  return client.execute(query);
}

async function criarTabelaAcomodacoes() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.acomodacoes (id uuid PRIMARY KEY, nome text, cama_solteiro int, cama_casal int, suite int, climatizacao boolean, garagem int, disponivel boolean);";
  return client.execute(query);
}

async function criarTabelaClienteAlocado() {
  const query = "CREATE TABLE IF NOT EXISTS atlantis.alocacoes (id uuid PRIMARY KEY, cliente_id uuid, acomodacao_id uuid);";
  return client.execute(query);
}

async function criarIndiceIdClienteAlocado() {
  const query = "CREATE INDEX IF NOT EXISTS id_alocado_cli ON atlantis.alocacoes (cliente_id);";
  return client.execute(query);
}

const id = uuidv4();
async function inserirUsuario(nome, nomeSocial, nascimento, cadastro, docs, telefones, dependentes, endereco) {
  // const id = uuidv4();

  const queryInserirCliente = 'INSERT INTO atlantis.clientes (id, nome, nome_social, nascimento, cadastro, titular) VALUES (?, ?, ?, ?, ?, ?)';
  const parametrosCliente = [id, nome, nomeSocial, nascimento, cadastro, true];
  await client.execute(queryInserirCliente, parametrosCliente, { prepare: true });

  const enderecoId = uuidv4();
  const queryInserirEndereco = 'INSERT INTO atlantis.endereco (id, id_cliente, cep, numero, locadouro, cidade, estado, pais, bairro) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const parametrosEndereco = [enderecoId, id, endereco.cep, endereco.numero, endereco.locadouro, endereco.cidade, endereco.estado, endereco.pais, endereco.bairro];
  await client.execute(queryInserirEndereco, parametrosEndereco, { prepare: true });  

  for (const doc of docs) {
    const docId = uuidv4();
    const queryInserirDoc = 'INSERT INTO atlantis.docs (id, tipo, numero, emissao) VALUES (?, ?, ?, ?)';
    const parametrosDoc = [docId, doc.numero, doc.emissao];
    await client.execute(queryInserirDoc, parametrosDoc, { prepare: true });

    const queryInserirClienteDoc = 'INSERT INTO atlantis.cliente_doc (id, id_cliente, id_doc) VALUES (?, ?, ?)';
    const parametrosClienteDoc = [uuidv4(), id, docId];
    await client.execute(queryInserirClienteDoc, parametrosClienteDoc, { prepare: true });
  }

  for (const telefone of telefones) {
    const telefoneId = uuidv4();
    const queryInserirTelefone = 'INSERT INTO atlantis.telefones (id, numero) VALUES (?, ?)';
    const parametrosTelefone = [telefoneId, telefone.numero];
    await client.execute(queryInserirTelefone, parametrosTelefone, { prepare: true });

    const queryInserirClienteTelefone = 'INSERT INTO atlantis.cliente_telefone (id, id_cliente, id_telefone) VALUES (?, ?, ?)';
    const parametrosClienteTelefone = [uuidv4(), id, telefoneId];
    await client.execute(queryInserirClienteTelefone, parametrosClienteTelefone, { prepare: true });
  }

  for (const dependente of dependentes) {
    const dependenteId = uuidv4();
    const queryInserirDependente = 'INSERT INTO atlantis.clientes (id, nome, nome_social, nascimento, cadastro, titular) VALUES (?, ?, ?, ?, ?, ?)';
    const parametrosDependente = [dependenteId, dependente.nome, dependente.nomeSocial, dependente.nascimento, dependente.cadastro, false];
    await client.execute(queryInserirDependente, parametrosDependente, { prepare: true });

    const queryInserirClienteDependente = 'INSERT INTO atlantis.cliente_dependente (id, id_cliente, id_dependente) VALUES (?, ?, ?)';
    const parametrosClienteDependente = [uuidv4(), id, dependenteId];
    await client.execute(queryInserirClienteDependente, parametrosClienteDependente, { prepare: true });
  }
}

async function selecionarDoc(id) {
  const querySelecionarDoc = `
  SELECT id, tipo, numero, emissao
  FROM atlantis.docs
  WHERE id = ? `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarDoc, parametros, { prepare: true });
  return resultado;
}

async function selecionarClienteDoc(id) {
  const querySelecionarClienteDoc = `
  SELECT id_doc
  FROM atlantis.cliente_doc
  WHERE id_cliente = ? `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarClienteDoc, parametros, { prepare: true });
  return resultado;
}

async function selecionarTelefone(id) {
  const querySelecionarTelefone = `
  SELECT id, numero
  FROM atlantis.telefones
  WHERE id = ? `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarTelefone, parametros, { prepare: true });
  return resultado;
}

async function selecionarClienteTelefone(id) {
  const querySelecionarClienteTelefone = `
  SELECT id_telefone
  FROM atlantis.cliente_telefone
  WHERE id_cliente = ? `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarClienteTelefone, parametros, { prepare: true });
  return resultado;
}

async function selecionarDependente(id) {
  const querySelecionarDependente = `
  SELECT
    id, nome, nome_social,
    nascimento, cadastro
  FROM atlantis.clientes
  WHERE id = ? `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarDependente, parametros, { prepare: true });
  return resultado;
}

async function selecionarEndereco(id) {
  const querySelecionarEndereco = `
  SELECT * FROM atlantis.endereco
  WHERE id_cliente = ? `;

  const parametros = [id];
  const resultado = await client.execute(querySelecionarEndereco, parametros, { prepare: true });
  return resultado;
}

async function selecionarClienteDependente(id) {
  const querySelecionarClienteDependente = `
  SELECT
    id_dependente
  FROM
    atlantis.cliente_dependente
  WHERE
    id_cliente = ?
  `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarClienteDependente, parametros, { prepare: true });
  return resultado;
}

async function selecionarAlocacao(id) {
  const query = 'SELECT * FROM atlantis.alocacoes WHERE cliente_id = ?';
  const resultado = await client.execute(query, [id]);
  return resultado.rows[0];
}

async function selectCliente(id) {
  const querySelecionarCliente = `
  SELECT
    id,
    nome,
    nome_social,
    nascimento,
    cadastro,
    titular
  FROM
    atlantis.clientes
  WHERE
    id = ?
  `;
  const parametros = [id];
  const resultado = await client.execute(querySelecionarCliente, parametros, { prepare: true });
  return resultado;
}

// funções para o front
async function clienteCompleto(id) {
  const usuario = {};
  const resultadoUsuario = await selectCliente(id);
  if (resultadoUsuario && resultadoUsuario.first()) {
    const usuarioOld = resultadoUsuario.first();
    usuario.id = usuarioOld.id;
    usuario.nome = usuarioOld.nome;
    usuario.nome_social = usuarioOld.nome_social;
    usuario.nascimento = usuarioOld.nascimento.toString();
    usuario.cadastro = usuarioOld.cadastro.toString();

    const [resultadoIdDocs, resultadoIdTelefones, resultadoIdDependentes] = await Promise.all([
      selecionarClienteDoc(id),
      selecionarClienteTelefone(id),
      selecionarClienteDependente(id)
    ]);

    if (resultadoIdDocs && resultadoIdDocs.rowLength > 0) {
      const docsArray = await Promise.all(resultadoIdDocs.rows.map(async (row) => {
        const idDoc = row.id_doc;
        const resultadoDoc = await selecionarDoc(idDoc);
        return resultadoDoc.first();
      }));
      usuario.docs = docsArray.map((doc) => ({ id: doc.id, tipo: doc.tipo, numero: doc.numero, emissao: doc.emissao.toString() }));
    }

    if (resultadoIdTelefones && resultadoIdTelefones.rowLength > 0) {
      const telefonesArray = await Promise.all(resultadoIdTelefones.rows.map(async (row) => {
        const idTelefone = row.id_telefone;
        const resultadoTelefone = await selecionarTelefone(idTelefone);
        return resultadoTelefone.first();
      }));
      usuario.telefones = telefonesArray.map((telefone) => ({ id: telefone.id, ddd: telefone.ddd, numero: telefone.numero }));
    }

    if (resultadoIdDependentes && resultadoIdDependentes.rowLength > 0) {
      const dependentesArray = await Promise.all(resultadoIdDependentes.rows.map(async (row) => {
        const idDependente = row.id_dependente;
        const resultadoDependente = await selecionarDependente(idDependente);
        return resultadoDependente.first();
      }));
      if (dependentesArray[0] != null) {
        usuario.dependentes = dependentesArray.map((dependente) => ({
          id: dependente.id,
          nome: dependente.nome,
          nome_social: dependente.nome_social,
          nascimento: dependente.nascimento.toString(),
          cadastro: dependente.cadastro.toString()
        }));
      }
    }

    const resultadoEndereco = await selecionarEndereco(id);
    if (resultadoEndereco && resultadoEndereco.rowLength > 0) {
      const endereco = resultadoEndereco.first();
      usuario.endereco = {
        id: endereco.id,
        locadouro: endereco.locadouro,
        cidade: endereco.cidade,
        estado: endereco.estado,
        pais: endereco.pais,
        bairro: endereco.bairro,
        numero: endereco.numero,
        cep: endereco.cep
      };
    }
  }
  return usuario;
}

async function atualizarCliente(id, nome, nomeSocial, nascimento, cadastro, docs, telefones, dependentes, endereco) {
  const queryAtualizarCliente = `
    UPDATE atlantis.clientes
    SET nome = ?, nome_social = ?, nascimento = ?, cadastro = ?
    WHERE id = ?
  `;
  const parametrosCliente = [nome, nomeSocial, nascimento, cadastro, id];
  await client.execute(queryAtualizarCliente, parametrosCliente, { prepare: true });

  if (docs != undefined) {
    for (const doc of docs) {
      if (doc.id) {
        const queryAtualizarDoc = `
          UPDATE atlantis.docs
          SET tipo = ?, numero = ?, emissao = ?
          WHERE id = ?
        `;
        const parametrosDoc = [doc.numero, doc.emissao, doc.id];
        await client.execute(queryAtualizarDoc, parametrosDoc, { prepare: true });
      } else {
        const docId = uuidv4();
        const queryInserirDoc = `
          INSERT INTO atlantis.docs (id, tipo, numero, emissao)
          VALUES (?, ?, ?, ?)
        `;
        const parametrosInserirDoc = [docId, doc.tipo, doc.numero, doc.emissao];
        await client.execute(queryInserirDoc, parametrosInserirDoc, { prepare: true });
  
        const queryInserirClienteDoc = `
          INSERT INTO atlantis.cliente_doc (id, id_cliente, id_doc)
          VALUES (?, ?, ?)
        `;
        const parametrosClienteDoc = [uuidv4(), id, docId];
        await client.execute(queryInserirClienteDoc, parametrosClienteDoc, { prepare: true });
      }
    }
  }

  if (telefones != undefined) {
    for (const telefone of telefones) {
      if (telefone.id) {
        const queryAtualizarTelefone = `
          UPDATE atlantis.telefones
          SET numero = ?
          WHERE id = ?
        `;
        const parametrosTelefone = [telefone.numero, telefone.id];
        await client.execute(queryAtualizarTelefone, parametrosTelefone, { prepare: true });
      } else {
        const telefoneId = uuidv4();
        const queryInserirTelefone = `
          INSERT INTO atlantis.telefones (id, numero)
          VALUES (?, ?)
        `;
        const parametrosInserirTelefone = [telefoneId, telefone.numero];
        await client.execute(queryInserirTelefone, parametrosInserirTelefone, { prepare: true });
  
        const queryInserirClienteTelefone = `
          INSERT INTO atlantis.cliente_telefone (id, id_cliente, id_telefone)
          VALUES (?, ?, ?)
        `;
        const parametrosClienteTelefone = [uuidv4(), id, telefoneId];
        await client.execute(queryInserirClienteTelefone, parametrosClienteTelefone, { prepare: true });
      }
    }
  }

  if (dependentes != undefined) {
    for (const dependente of dependentes) {
      if (dependente.id) {
        const queryAtualizarDependente = `
          UPDATE atlantis.clientes
          SET nome = ?, nome_social = ?, nascimento = ?, cadastro = ?, titular = ?
          WHERE id = ?
        `;
        const parametrosDependente = [dependente.nome, dependente.nome_social, dependente.nascimento, dependente.cadastro, dependente.titular, dependente.id];
        await client.execute(queryAtualizarDependente, parametrosDependente, { prepare: true });
      } else {
        const dependenteId = uuidv4();
        const queryInserirDependente = `
          INSERT INTO atlantis.clientes (id, nome, nome_social, nascimento, cadastro, titular)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        const parametrosInserirDependente = [dependenteId, dependente.nome, dependente.nome_social, dependente.nascimento, dependente.cadastro, dependente.titular];
        await client.execute(queryInserirDependente, parametrosInserirDependente, { prepare: true });
  
        const queryInserirClienteDependente = `
          INSERT INTO atlantis.cliente_dependente (id, id_cliente, id_dependente)
          VALUES (?, ?, ?)
        `;
        const parametrosClienteDependente = [uuidv4(), id, dependenteId];
        await client.execute(queryInserirClienteDependente, parametrosClienteDependente, { prepare: true });
      }
  }
  }

  const query = 'SELECT id FROM atlantis.endereco WHERE id_cliente = ?';
  const resultado = await client.execute(query, [id]);
  const idsEnderecos = resultado.rows.map(row => row.id);
  await Promise.all(
    idsEnderecos.map(async (id_endereco) => {
      const queryAtualizarEndereco = `
        UPDATE atlantis.endereco
        SET cep = ?, numero = ?, locadouro = ?, cidade = ?, estado = ?, pais = ?, bairro = ?
        WHERE id = ?;
      `;
      const parametrosEndereco = [endereco.cep, endereco.numero, endereco.locadouro, endereco.cidade, endereco.estado, endereco.pais, endereco.bairro, id_endereco];
      await client.execute(queryAtualizarEndereco, parametrosEndereco, { prepare: true });
    })
  );
}

async function desalocarCliente(idCliente) {
  const querySelecionarAlocacao = 'SELECT * FROM atlantis.alocacoes WHERE cliente_id = ?';
  const resultadoAlocacao = await client.execute(querySelecionarAlocacao, [idCliente]);

  if (resultadoAlocacao.rowLength === 0) {
    return;
  }

  const queryObterDependentes = 'SELECT id_dependente FROM atlantis.cliente_dependente WHERE id_cliente = ?';
  const parametrosDependentes = [idCliente];
  const resultadoDependentes = await client.execute(queryObterDependentes, parametrosDependentes, { prepare: true });
  if (resultadoDependentes.rowLength !== 0) {
    const dependentes = resultadoDependentes.rows.map(row => row.id_dependente);

    dependentes.map(dependenteId => desalocarCliente(dependenteId));
  }

  const alocacao = resultadoAlocacao.first();
  const acomodacaoId = alocacao.acomodacao_id;

  const queryExcluirAlocacao = 'DELETE FROM atlantis.alocacoes WHERE id = ?';
  await client.execute(queryExcluirAlocacao, [alocacao.id]);

  const queryAtualizarDisponibilidade = 'UPDATE atlantis.acomodacoes SET disponivel = true WHERE id = ?';
  await client.execute(queryAtualizarDisponibilidade, [acomodacaoId]);
}

async function main() {
  await client.connect();
  await criarTabelaClientes();
  await criarTabelaClienteDependente();
  await criarIndiceIdClienteDependente();
  await criarIndiceClienteIdDependente();
  await criarTabelaTelefones();
  await criarTabelaClienteTelefone();
  await criarIndiceIdClienteTelefone();
  await criarIndiceClienteIdTelefone();
  await criarTabelaDocs();
  await criarTabelaClienteDoc();
  await criarIndiceIdClienteDoc();
  await criarIndiceClienteIdDoc();
  await criarTabelaEndereco();
  await criarIndiceEnderecoCliente();
  await criarTabelaAcomodacoes();
  await criarTabelaClienteAlocado();
  await criarIndiceIdClienteAlocado();
  console.log("Conexão feita com sucesso! \nProssiga para o front-end");
}
main();

const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json()); 
app.use(cors());
app.use(express.urlencoded({ extended: false })); 

app.post('/adicionar/cliente', async (req, res) => {
  try {
    const usuario = req.body;
    await inserirUsuario(usuario.nome, usuario.nomeSocial, usuario.nascimento, usuario.cadastro, usuario.docs, usuario.telefones, usuario.dependentes, usuario.endereco);
    res.status(200).send('Cliente inserido com sucesso!');
  } catch (error) {
    console.error('Erro ao inserir o cliente:', error);
    res.status(500).send('Ocorreu um erro ao inserir o cliente.');
  }
});

app.get('/clientes', async (req, res) => {
  try {
    const query = 'SELECT * FROM atlantis.clientes';
    const resultado = await client.execute(query);
    const clientes = resultado.rows;

    res.status(200).json(clientes);
  } catch (error) {
    console.error('Erro ao obter os clientes:', error);
    res.status(500).send('Ocorreu um erro ao obter os clientes.');
  }
});

app.put('/cliente', async (req, res) => {
  try {
    const id = req.body.id; 
    const cliente = await clienteCompleto(id);

    if (Object.keys(cliente).length === 0) {
      res.status(404).send('Cliente não encontrado.');
    } else {
      res.status(200).json(cliente);
    }
  } catch (error) {
    console.error('Erro ao obter o cliente:', error);
    res.status(500).send('Ocorreu um erro ao obter o cliente.');
  }
});

app.put('/atualizar/cliente', async (req, res) => {
  const { id, nome, nomeSocial, nascimento, cadastro, docs, telefones, dependentes, endereco } = req.body;

  try {
    await atualizarCliente(id, nome, nomeSocial, nascimento, cadastro, docs, telefones, dependentes, endereco);
    res.status(200).json({ message: 'Cliente atualizado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ocorreu um erro ao atualizar o cliente' });
  }
});

app.delete('/deletar/cliente', async (req, res) => {
  try {
    const id = req.body.id;

    const clienteExistente = await selectCliente(id);
    if (!clienteExistente.first()) {
      res.status(404).send('Cliente não encontrado.');
      return;
    }

    const queryIdClienteDoc = 'SELECT id_doc FROM atlantis.cliente_doc WHERE id_cliente = ?';
    const idClienteDocResult = await client.execute(queryIdClienteDoc, [id], { prepare: true });
    const idsDoc = idClienteDocResult.rows.map(row => row.id_doc);

    for (const idDoc of idsDoc) {
      const queryExcluirClienteDocReferencia = 'DELETE FROM atlantis.cliente_doc WHERE id = ?';
      await client.execute(queryExcluirClienteDocReferencia, [idDoc], { prepare: true });

      const queryExcluirDoc = 'DELETE FROM atlantis.docs WHERE id = ?';
      await client.execute(queryExcluirDoc, [idDoc], { prepare: true });
    }

    const queryIdClienteTelefone = 'SELECT id_telefone FROM atlantis.cliente_telefone WHERE id_cliente = ?';
    const idClienteTelefoneResult = await client.execute(queryIdClienteTelefone, [id], { prepare: true });
    const idsTelefone = idClienteTelefoneResult.rows.map(row => row.id_telefone);

    for (const idTelefone of idsTelefone) {
      const queryExcluirClienteTelefoneReferencia = 'DELETE FROM atlantis.cliente_telefone WHERE id = ?';
      await client.execute(queryExcluirClienteTelefoneReferencia, [idTelefone], { prepare: true });

      const queryExcluirTelefone = 'DELETE FROM atlantis.telefones WHERE id = ?';
      await client.execute(queryExcluirTelefone, [idTelefone], { prepare: true });
    }

    // Excluir os registros de dependentes relacionados ao cliente
    const queryIdClienteDependente = 'SELECT id_dependente FROM atlantis.cliente_dependente WHERE id_cliente = ?';
    const idClienteDependenteResult = await client.execute(queryIdClienteDependente, [id], { prepare: true });
    const idsDependente = idClienteDependenteResult.rows.map(row => row.id_dependente);

    for (const idDependente of idsDependente) {
      // Excluir a referência do cliente para o dependente
      const queryExcluirClienteDependenteReferencia = 'DELETE FROM atlantis.cliente_dependente WHERE id = ?';
      await client.execute(queryExcluirClienteDependenteReferencia, [idDependente], { prepare: true });

      // Excluir o registro de dependente
      const queryExcluirDependente = 'DELETE FROM atlantis.clientes WHERE id = ?';
      await client.execute(queryExcluirDependente, [idDependente], { prepare: true });
    }

    const queryExcluirDependente = 'DELETE FROM atlantis.clientes WHERE id = ?';
    await client.execute(queryExcluirDependente, [id], { prepare: true });

    res.status(200).send('Cliente excluído com sucesso!');
  } catch (error) {
    console.error('Erro ao excluir o cliente:', error);
    res.status(500).send('Ocorreu um erro ao excluir o cliente.');
  }
});

app.get('/clientes-nao-alocados', async (req, res) => {
  try {
    const queryClientes = 'SELECT * FROM atlantis.clientes';
    const resultadoClientes = await client.execute(queryClientes);
    const clientes = resultadoClientes.rows;

    const clientesFinal = [];
    for (const cliente of clientes) {
      const resultadoAlocacao = await selecionarAlocacao(cliente.id);
      if (!resultadoAlocacao) {
        clientesFinal.push(cliente);
      }
    }

    res.status(200).json(clientesFinal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os clientes não alocados.' });
  }
});

app.get('/clientes-alocados', async (req, res) => {
  try {
    const queryClientes = 'SELECT * FROM atlantis.clientes';
    const resultadoClientes = await client.execute(queryClientes);
    const clientes = resultadoClientes.rows;

    const clientesFinal = [];
    for (const cliente of clientes) {
      const resultadoAlocacao = await selecionarAlocacao(cliente.id);
      if (resultadoAlocacao) {
        clientesFinal.push(cliente);
      }
    }

    res.status(200).json(clientesFinal);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao buscar os clientes não alocados.' });
  }
});

app.post('/adicionar/acomodacao', async (req, res) => {
  try {
    const acomodacao = req.body;
    const id = uuidv4();

    const query = 'INSERT INTO atlantis.acomodacoes (id, nome, cama_solteiro, cama_casal, suite, climatizacao, garagem) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const parametros = [id, acomodacao.nome, acomodacao.cama_solteiro, acomodacao.cama_casal, acomodacao.suite, acomodacao.climatizacao, acomodacao.garagem];
    await client.execute(query, parametros, { prepare: true });

    res.json({ message: 'Acomodação adicionada com sucesso' });
  } catch (error) {
    console.error('Erro ao adicionar acomodação:', error);
    res.status(500).json({ error: 'Erro ao adicionar acomodação' });
  }
});

app.get('/acomodacoes', async (req, res) => {
  try {
    const query = 'SELECT * FROM atlantis.acomodacoes';
    const resultado = await client.execute(query);
    const acomodacoes = resultado.rows;
    res.json(acomodacoes);
  } catch (error) {
    console.error('Erro ao obter as acomodações:', error);
    res.status(500).json({ error: 'Erro ao obter as acomodações' });
  }
});

app.get('/acomodacao', async (req, res) => {
  try {
    const { id } = req.body;

    const querySelecionarAcomodacao = `
      SELECT id, nome,
        cama_solteiro, cama_casal,
        suite, climatizacao, garagem
      FROM
        atlantis.acomodacoes
      WHERE id = ? `;
    const parametros = [id];
    const resultado = await client.execute(querySelecionarAcomodacao, parametros, { prepare: true });

    if (resultado && resultado.first()) {
      const acomodacao = resultado.first();
      const acomodacaoObjeto = {
        id: acomodacao.id,
        nome: acomodacao.nome,
        cama_solteiro: acomodacao.cama_solteiro,
        cama_casal: acomodacao.cama_casal,
        suite: acomodacao.suite,
        climatizacao: acomodacao.climatizacao,
        garagem: acomodacao.garagem
      };
      res.json(acomodacaoObjeto);
    } else {
      res.status(404).json({ error: 'Acomodação não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar acomodação' });
  }
});

app.delete('/deletar/acomodacao', async (req, res) => {
  try {
    const { id } = req.body;

    const queryDeletarAcomodacao = `
      DELETE FROM atlantis.acomodacoes
      WHERE id = ? `;
    const parametros = [id];
    const resultado = await client.execute(queryDeletarAcomodacao, parametros, { prepare: true });

    if (resultado && resultado.wasApplied()) {
      res.json({ message: 'Acomodação deletada com sucesso' });
    } else {
      res.status(404).json({ error: 'Acomodação não encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao deletar acomodação' });
  }
});

app.post('/alocar', async (req, res) => {
  const { clienteId, acomodacaoId } = req.body;

  try {
    const queryObterDependentes = 'SELECT id_dependente FROM atlantis.cliente_dependente WHERE id_cliente = ?';
    const parametrosDependentes = [clienteId];
    const resultadoDependentes = await client.execute(queryObterDependentes, parametrosDependentes, { prepare: true });
    const dependentes = resultadoDependentes.rows.map(row => row.id_dependente);

    const alocacaoClienteId = uuidv4();
    const queryInserirAlocacaoCliente = 'INSERT INTO atlantis.alocacoes (id, cliente_id, acomodacao_id) VALUES (?, ?, ?)';
    await client.execute(queryInserirAlocacaoCliente, [alocacaoClienteId, clienteId, acomodacaoId], { prepare: true });

    const queryInserirAlocacaoDependente = 'INSERT INTO atlantis.alocacoes (id, cliente_id, acomodacao_id) VALUES (?, ?, ?)';
    const parametrosAlocacaoDependentes = dependentes.map(dependenteId => [uuidv4(), dependenteId, acomodacaoId]);
    await Promise.all(parametrosAlocacaoDependentes.map(parametros => client.execute(queryInserirAlocacaoDependente, parametros, { prepare: true })));

    const queryAtualizarDisponibilidade = 'UPDATE atlantis.acomodacoes SET disponivel = false WHERE id = ?';
    await client.execute(queryAtualizarDisponibilidade, [acomodacaoId], { prepare: true });

    res.status(200).json({ message: 'Cliente e seus dependentes alocados com sucesso' });
  } catch (error) {
    console.error('Erro ao alocar cliente e dependentes:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao alocar o cliente e seus dependentes' });
  }
});

app.post('/desalocar', async (req, res) => {
  const { clienteId } = req.body;

  try {
    await desalocarCliente(clienteId);
    res.status(200).json({ message: 'Cliente desalocado com sucesso.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao desalocar cliente.' });
  }
});


app.listen(3001, () => {
  console.log('Conectando... \nEspere por favor \n');
});