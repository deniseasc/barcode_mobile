//Função para abrir o plugin de leitor de codigo de barras
function scanBarcode(){
  window.plugins.barcodeScanner.scan( function(result) 
  {
    alert("We got a barcode\n" +
      "Result: " + result.text + "\n" +
      "Format: " + result.format + "\n" +
      "Cancelled: " + result.cancelled);
      $("#barra").val(result.text);
  }, 
  function(error)
  {

    alert("Scanning failed: " + error);
  });
}

$(document).on('click','#barcode',function(){
  scanBarcode();
  habilita();
});

// Cadastrar
$(document).on("click","#cadastrar",function(){
    var parametros = {
      "nome": $("#nome").val(),
      "barra": $("#barra").val(),
      "valor": $("#valor").val(),
      "descricao": $("#descricao").val(),
      "processador": $("#processador").val(),
      "sistema": $("#sistema").val(),
      "tela": $("#tela").val(),
      "wifi": $("#wifi").val(),
      "cameras": $("#cameras").val(),
      "resolucao": $("#resolucao").val(),
      "memoria": $("#memoria").val()
    };
    

    $.ajax({
      type:"post", //como enviar
      url:"https://bd-barcode-soaresmju.c9users.io/cadastra.php", //para onde enviar
      data:parametros, //o que enviar
      //se der certo
      success: function(data){
        navigator.notification.alert(data);
        $("#nome").val("");
        $("#barra").val("");
        $("#valor").val("");
        $("#descricao").val("");
        $("#processador").val("");
        $("#sistema").val("");
        $("#tela").val("");
        $("#wifi").val("");
        $("#cameras").val("");
        $("#resolucao").val("");
        $("#memoria").val("");
      },
      //se der errado
      error: function(data){
        navigator.notification.alert(data);
      }
    });
    desabilita();
});
// Cadastrar

// Listar
function listarProdutos(){
  $.ajax({
      type:"post", //como enviar
      url:"https://bd-barcode-soaresmju.c9users.io/listar.php", //para onde enviar
      dataType:"json",
      //se der certo
      success: function(data){
        var itemLista = "";
        $.each(data.celular,function(i,dados){                                                                                              
          itemLista += "<option value='"+dados.codigo+"'>"+dados.nome+"</option>";
        });
        $("#lista").html(itemLista);
  },
  // se der errado
  error: function(data){
    navigator.notification.alert(data);
  }
  });
}
// Listar

// Lista1
$(document).on("change","#lista",function(){
    var codigoescolhido = $("option:selected", ("#lista")).val();
    $.ajax({
        type:"get", //como enviar
        url:"https://bd-barcode-soaresmju.c9users.io/listarum.php",//para onde enviar
        data:"id="+codigoescolhido,
        dataType:"json",
        //se der certo
        success: function(data){
            $("#codigo1").val(data.celular.codigo);
            $("#nome1").val(data.celular.nome);
            $("#barra1").val(data.celular.barra);
            $("#valor1").val(data.celular.valor);
            $("#descricao1").val(data.celular.descricao);
            $("#processador1").val(data.celular.processador);
            $("#sistema1").val(data.celular.sistema);
            $("#tela1").val(data.celular.tela);
            $("#wifi1").val(data.celular.wifi);
            $("#camera1").val(data.celular.cameras);
            $("#resolucao1").val(data.celular.resolucao);
            $("#memoria1").val(data.celular.memoria);
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    });    
}); 
// Lista1

//Update
$(document).on("click","#salvar",function(){
   var parametros = {
        "codigo": $("#codigo1").val(),
        "nome": $("#nome1").val(),
        "barra": $("#barra1").val(),
        "valor": $("#valor1").val(),
        "descricao": $("#descricao1").val(),
        "processador": $("#processador1").val(),
        "sistema": $("#sistema1").val(),
        "tela": $("#tela1").val(),
        "wifi": $("#wifi1").val(),
        "cameras": $("#camera1").val(),
        "resolucao": $("#resolucao1").val(),
        "memoria": $("#memoria1").val()
    };

    $.ajax({
        type:"get", //como enviar
        url:"https://bd-barcode-soaresmju.c9users.io/update.php",//para onde enviar
        data:parametros,//o que enviar
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});
//Update
//delete
$(document).on("click","#excluir",function(){
    $.ajax({
        type:"get", //como enviar
        url:"https://bd-barcode-soaresmju.c9users.io/delete.php",//para onde enviar
        data:"id="+$("#codigo").val(),
        //se der certo
        success: function(data){
            navigator.notification.alert(data);
            location.reload();//recarrega a pagina
        },
        //se der errado
        error: function(data){
             navigator.notification.alert(data);
        }
    }); 
});
//delete
function habilita(){
  $("#nome").prop("disabled",false);
  $("#valor").prop("disabled",false);
  $("#descricao").prop("disabled",false);
  $("#processador").prop("disabled",false);
  $("#sistema").prop("disabled",false);
  $("#tela").prop("disabled",false);
  $("#wifi").prop("disabled",false);
  $("#cameras").prop("disabled",false);
  $("#resolucao").prop("disabled",false);
  $("#memoria").prop("disabled",false);
}

//Função para desabilitar as inputs
function desabilita(){
  $("#nome").prop("disabled",true);
  $("#barra").prop("disabled",true);
  $("#valor").prop("disabled",true);
  $("#descricao").prop("disabled",true);
  $("#processador").prop("disabled",true);
  $("#sistema").prop("disabled",true);
  $("#tela").prop("disabled",true);
  $("#wifi").prop("disabled",true);
  $("#cameras").prop("disabled",true);
  $("#resolucao").prop("disabled",true);
  $("#memoria").prop("disabled",true);
}

//Botão que chama a função de habilitar as inputs
$(document).on("click","#editar",function(){
  habilitaa();
});

//Botão que chama a função de desabilitar as inputs
$(document).on("click","#cancelar",function(){
  desabilitaa();
});

//Função para desabilitar as inputs
function desabilitaa(){
  document.getElementById("codigo1").disabled = true;
  document.getElementById("nome1").disabled = true;
  document.getElementById("barra1").disabled = true;
  document.getElementById("valor1").disabled = true;
  document.getElementById("descricao1").disabled = true;
  document.getElementById("processador1").disabled = true;
  document.getElementById("sistema1").disabled = true;
  document.getElementById("tela1").disabled = true;
  document.getElementById("wifi1").disabled = true;
  document.getElementById("camera1").disabled = true;
  document.getElementById("resolucao1").disabled = true;
  document.getElementById("memoria1").disabled = true;
}

function habilitaa(){
  $("#codigo1").prop("disabled",false);
  $("#nome1").prop("disabled",false);
  $("#barra1").prop("disabled",false);
  $("#valor1").prop("disabled",false);
  $("#descricao1").prop("disabled",false);
  $("#processador1").prop("disabled",false);
  $("#sistema1").prop("disabled",false);
  $("#tela1").prop("disabled",false);
  $("#wifi1").prop("disabled",false);
  $("#camera1").prop("disabled",false);
  $("#resolucao1").prop("disabled",false);
  $("#memoria1").prop("disabled",false);
}