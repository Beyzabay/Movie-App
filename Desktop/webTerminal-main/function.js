var localApiBaseUrl = "https://terminal.hackercan.dev";

// src = "https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js";
// $.getJSON("https://api.ipify.org?format=json", function (data) {
  // $("#ipconfig").html(data.ip);
// });

document.addEventListener("DOMContentLoaded", function () {
  document.getElementsByTagName("form")[0].onsubmit = function (evt) {
    evt.preventDefault();
    checkWord();
    window.scrollTo(0, 150);
  };

  document.getElementById("terminalTextInput").focus();

  var textInputValue = document
    .getElementById("terminalTextInput")
    .value.trim();

  var textResultsValue = document.getElementById(
    "terminalReslutsCont"
  ).innerHTML;

  var clearInput = function () {
    document.getElementById("terminalTextInput").value = "";
  };

  var scrollToBottomOfResults = function () {
    var terminalResultsDiv = document.getElementById("terminalReslutsCont");
    terminalResultsDiv.scrollTop = terminalResultsDiv.scrollHeight;
  };

  scrollToBottomOfResults();

  var addTextToResults = function (textToAdd) {
    document.getElementById("terminalReslutsCont").innerHTML +=
      "<p>" + textToAdd + "</p>";
    scrollToBottomOfResults();
  };

  var addPingResult = function (result) {
    var resultsContainer = document.getElementById("terminalReslutsCont");
    var pingResultLines = result.split("\n");

    pingResultLines.forEach(function (line, index) {
      setTimeout(function () {
        addTextToResults(line);
      }, index * 1000);
    });
  };

  var apiEndpoints = {
    "hostname": localApiBaseUrl + "/api/Command/getcommand?commandName=hostname",
    "chkdsk": localApiBaseUrl + "/api/Command/getcommand?commandName=chkdsk",
    "ipconfig": localApiBaseUrl + "/api/Command/getcommand?commandName=ipconfig",
    "systeminfo": localApiBaseUrl + "/api/Command/getcommand?commandName=systeminfo",
    "ver": localApiBaseUrl + "/api/Command/getcommand?commandName=ver",
    "date": localApiBaseUrl + "/api/Command/getcommand?commandName=date",
    "time": localApiBaseUrl + "/api/Command/getcommand?commandName=time",
    "help": localApiBaseUrl + "/api/Command/getcommand?commandName=help",
    "nslookup": localApiBaseUrl + "/api/Command/getcommand?commandName=nslookup",
    "assoc": localApiBaseUrl + "/api/Command/getcommand?commandName=assoc",
    "vol": localApiBaseUrl + "/api/Command/getcommand?commandName=vol",
    "gpresult": localApiBaseUrl + "/api/Command/getcommand?commandName=gpresult",
    "netstat": localApiBaseUrl + "/api/Command/getcommand?commandName=netstat",
    "getmac": localApiBaseUrl + "/api/Command/getcommand?commandName=getmac",
    "tasklist": localApiBaseUrl + "/api/Command/getcommand?commandName=tasklist",
    "schtasks": localApiBaseUrl + "/api/Command/getcommand?commandName=schtasks",
    "powercfg": localApiBaseUrl + "/api/Command/getcommand?commandName=powercfg",
    "powercfg /list": localApiBaseUrl + "/api/Command/getcommand?commandName=powercfg%20%2Flist",
    "tree": localApiBaseUrl + "/api/Command/getcommand?commandName=tree",
    "find": localApiBaseUrl + "/api/Command/find",
    "whois": localApiBaseUrl + "/api/Command/getcommand?commandName=whois"
  };

  var checkWord = function () {
    textInputValue = document.getElementById("terminalTextInput").value.trim();
    textInputValueLowerCase = textInputValue.toLowerCase();
    
    const colorMap = {
      "color red": "red",
      "color blue": "blue",
      "color black": "black",
      "color pink": "rgba(235, 12, 228, 0.9)",
      "color orange": "orange",
      "color yellow": "yellow",
      "color green": "green",
      "color purple": "purple",
      "color gray": "gray",
      "color white": "white",
      "color default": "white",
    };
    
    const inputText = textInputValueLowerCase.trim();
    const terminalResultsCont = document.getElementById("terminalReslutsCont");
    
    if (colorMap.hasOwnProperty(inputText)) {
      terminalResultsCont.style.color = colorMap[inputText];
    }

    

    if (textInputValue != "") {
      addTextToResults(
        "<p class='userEnteredText'>> " + textInputValue + "</p>"
      );
      clearInput();


      if (apiEndpoints.hasOwnProperty(textInputValueLowerCase)) {
        var apiUrl = apiEndpoints[textInputValueLowerCase];
        if (apiUrl) {
          fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
              }
              return response.text();
            })
            .then(function (data) {
              var resultLines = data.split("\n");
              for (var i = 0; i < resultLines.length; i++) {
                addTextToResults(resultLines[i]);
              }
            })
            .catch(function (error) {
              console.log("Hata: " + error);
            });
        } else {
          addTextToResults("<p>Error: Command not supported</p>");
        }
      } else if (textInputValueLowerCase.startsWith("ping ")) {
        var ipAddress = textInputValueLowerCase.replace("ping ", "");
        fetch(
          localApiBaseUrl + "/api/Command/ping?ipAddress=" + ipAddress,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then(function (response) {
            if (!response.ok) {
              throw new Error("HTTP error, status = " + response.status);
            }
            return response.text();
          })
          .then(function (data) {
            var pingResult = data;
            addPingResult(pingResult);
          })
          .catch(function (error) {
            console.log("Hata: " + error);
          });
      } else if (textInputValueLowerCase.startsWith("cd ")) {
        var folderName = textInputValue.substring(3);
        var apiUrl = localApiBaseUrl + "/api/Command/cd/" + folderName;

        fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("HTTP error, status = " + response.status);
            }
            return response.text();
          })
          .then(function (data) {
            var cdResult = data;

            addTextToResults(cdResult);
          })
          .catch(function (error) {
            console.log("Hata: " + error);
          });
      } else if (textInputValueLowerCase === "net") {
        fetch(localApiBaseUrl + "/api/Command/net?command=net", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("HTTP error, status = " + response.status);
            }
            return response.text();
          })
          .then(function (data) {
            var netResult = data;
            var netLines = netResult.split("\n");
            for (var i = 0; i < netLines.length; i++) {
              addTextToResults(netLines[i]);
            }
          })
          .catch(function (error) {
            console.log("Hata: " + error);
          });
      } else if (textInputValueLowerCase.startsWith("net")) {
        var netSubCommand = textInputValueLowerCase.substring(4).trim();
        
        var parts = netSubCommand.split(' ');
        var subCommand = parts[0];
        var arguments = parts.slice(1).join(' ');
      
        var apiUrl = localApiBaseUrl + `/api/Command/net?command=net%20${subCommand}`;
        if (arguments) {
          apiUrl += `%20${encodeURIComponent(arguments)}`;
        }
        console.log("deneme");
      
        fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("HTTP error, status = " + response.status);
            }
            return response.text();
          })
          .then(function (data) {
            var netResult = data;
            var netLines = netResult.split("\n");
            for (var i = 0; i < netLines.length; i++) {
              addTextToResults(netLines[i]);
            }
          })
          .catch(function (error) {
            console.log("Hata: " + error);
          });
      } else if (textInputValueLowerCase.startsWith("mkdir ")) {
        var folderName = textInputValue.substring(6);
        var apiUrl = localApiBaseUrl + "/api/Command/mkdir";

        fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commandText: folderName,
            executionTime: new Date().toISOString(),
          }),
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("HTTP error, status = " + response.status);
            }
            return response.text();
          })
          .then(function (data) {
            var mkdirResult = data;
            addTextToResults(mkdirResult);

            console.log("Veritabanına kaydedilen dosya yolu: " + mkdirResult);
          })
          .catch(function (error) {
            console.log("Hata: " + error);
          });
      } else if (textInputValueLowerCase.startsWith("rmdir ")) {
        var folderName = textInputValue.substring(6);
        var apiUrl = localApiBaseUrl + "/api/Command/rmdir";

        fetch(apiUrl, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            commandText: folderName,
            executionTime: new Date().toISOString(),
          }),
        })
          .then(function (response) {
            if (!response.ok) {
              throw new Error("HTTP error, status = " + response.status);
            }
            return response.text();
          })
          .then(function (data) {
            var rmdirResult = data;
            addTextToResults(rmdirResult);

            console.log(rmdirResult);
          })
          .catch(function (error) {
            console.log("Hata: " + error);
          });
      } else if (textInputValueLowerCase.startsWith("ren ")) {
        var names = textInputValueLowerCase.substring(4).split(' ');

    if (names.length === 2) {
        var folderName = names[0];
        var newFolderName = names[1];

        var apiUrl = localApiBaseUrl + "/api/Command/ren";

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                oldName: folderName,
                newName: newFolderName,
            }),
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
            }
            return response.text();
        })
        .then(function (data) {
            var renResult = data;
            addTextToResults(renResult);

            console.log("Veritabanına kaydedilen dosya yolu: " + renResult);
        })
        .catch(function (error) {
            console.log("Hata: " + error);
        });
    } else {
        console.log("Hatalı komut formatı. Lütfen 'ren eski_ad yeni_ad' formatını kullanın.");
    }
} else if (textInputValueLowerCase === "ren") {
    clearInput();  
}else if (textInputValueLowerCase.startsWith("find ")) {
        var findParameters = textInputValueLowerCase.substring(5).trim();      
        var parts = findParameters.split(' ');
        if (parts.length >= 2) {
          var parameter1 = parts[0];
          var parameter2 = parts[1];
          var apiUrl = apiEndpoints["find"] + `?searchTerm=${encodeURIComponent(parameter1)}&fileName=${encodeURIComponent(parameter2)}`;
          fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
              }
              return response.text();
            })
            .then(function (data) {
              var findResult = data;
              var findLines = findResult.split("\n");
              for (var i = 0; i < findLines.length; i++) {
                addTextToResults(findLines[i]);
              }
            })
            .catch(function (error) {
              console.log("Hata: " + error);
            });
        }  
       } else if (textInputValueLowerCase.startsWith("whois ")) {
        var whoisParameters = textInputValueLowerCase.substring(6).trim();
        var parts = whoisParameters.split(' ');
        
        if (parts.length >= 1) {
          var parameter1 = parts[0];
          var apiUrl = apiEndpoints["whois"] + `%20${encodeURIComponent(parameter1)}`;
          
          fetch(apiUrl, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              if (!response.ok) {
                throw new Error("HTTP error, status = " + response.status);
              }
              return response.text();
            })
            .then(function (data) {
              var whoisResult = data;
              var whoisLines = whoisResult.split("\n");
              for (var i = 0; i < whoisLines.length; i++) {
                addTextToResults(whoisLines[i]);
              }
            })
            .catch(function (error) {
              console.log("Hata: " + error);
            });
        } else {
          addTextToResults("<p>Error: Invalid parameters for 'whois' command</p>");
        }
      } else if(textInputValueLowerCase === "cls"){
        window.location.reload(false);
      }
    }
  };
});
