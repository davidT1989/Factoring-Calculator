function simplify(p){
  t=p.toString();
  simple = Algebrite.run(t);
  simple = simple.replace(/\s/g, '');
  return simple;
}

function calculate(){
  document.getElementById("origin").innerHTML="";
  document.getElementById("output").innerHTML="";
  document.getElementById("evaloutput").innerHTML=""; 
  document.getElementById("factorized").innerHTML = "";
  p=document.getElementById("poly").value;
  document.getElementById("output").innerHTML = simplify(p);
  factorize(p);
  document.getElementById("origin").innerHTML=p;
  
}

function factorize(p){
  p=document.getElementById("poly").value;
  asa = simplify(p).toString();
  var s= Polynomial(asa);
  var n = s.degree(); t=s.monic(); alpha=s.lc();
  
  if (n<2){
    document.getElementById("factorized").innerHTML = s;
  }
  else{
    var f, k=[],fp=[], fq=[], fa=[], fb=[];
    for (var i = 0; i <= n; i++) {
      if(t.coeff[i]===undefined){
        k[i] = 0;
      }
      else{k[i] = t.coeff[i];}         
    }
    if(!k.some(isFloat) && (alpha!=1)){
      var keys = Object.keys(t.coeff).map(Number).filter(function(a){
        return isFinite(a) && t.coeff[a];
      });
      var min = Math.min.apply(Math, keys);
      var max = Math.max.apply(Math, keys);
      fp=factors(Math.abs(t.coeff[min]));
      fq=factors(Math.abs(t.coeff[n]));
      for (var i = 0 ; i <fp.length ; i++) {
      fa.push(fp[i]);
      fa.push(-fp[i]);
      }
      for (var j = 0; j <fq.length ; j++) {
        fb.push(fq[j]);
      }
      document.getElementById("factorized").innerHTML = alpha;
      while (n>1) {
        n=n-1;
        for (var i = 0; i < fa.length; i++) {
          for (var j = 0; j < fb.length; j++) {
            var d=Polynomial({0:fa[i], 1:fb[j]});
            q=t.div(d); r = t.mod(d);
            divder = d.toString();
            if(r.toString()==="0"){
              document.getElementById("factorized").innerHTML +="("+divder+")";
              t=q;
            }
          } 
        }
      }
      if(t.toString()!="1"){
        if(t.coeff[0]===undefined){
          document.getElementById("factorized").innerHTML += t.toString();
        }
        else{
          document.getElementById("factorized").innerHTML += "("+t.toString()+")";
        }
      
      }         
    }
    else {
        var keys = Object.keys(s.coeff).map(Number).filter(function(a){
          return isFinite(a) && s.coeff[a];
        });
      var min = Math.min.apply(Math, keys);
      var max = Math.max.apply(Math, keys);
      fp=factors(Math.abs(s.coeff[min]));
      fq=factors(Math.abs(s.coeff[n]));
      for (var i = 0 ; i <fp.length ; i++) {
      fa.push(fp[i]);
      fa.push(-fp[i]);
      }
      for (var j = 0; j <fq.length ; j++) {
        fb.push(fq[j]);
      }
      
      while (n>1) {
        n=n-1;
        for (var i = 0; i < fa.length; i++) {
          for (var j = 0; j < fb.length; j++) {
            var d=Polynomial({0:fa[i], 1:fb[j]});
            q=s.div(d); r = s.mod(d);
            divder = d.toString();
            if(r.toString()==="0"){
              document.getElementById("factorized").innerHTML +="("+divder+")";
              s=q;
            }
          } 
        }
      }
      if(s.toString()!=1){
        if(s.coeff[0]===undefined){
          document.getElementById("factorized").innerHTML +=s.toString();
        }
        else {
          document.getElementById("factorized").innerHTML +="("+ s.toString()+")"; 
        }
      }  
    }     
  }
}


function eval(){
  p=document.getElementById("output").innerHTML;
  x=document.getElementById("variable").value;
  asa = p.toString();
  var s= Polynomial(asa);
  sum = s.result(x);
  document.getElementById("evaloutput").innerHTML = s.toString()+"="+sum;
}

function factors(n)
{
 var num_factors = [], i;
 
 for (i = 1; i <= Math.floor(Math.sqrt(n)); i += 1)
  if (n % i === 0)
  {
   num_factors.push(i);
   if (n / i !== i)
    num_factors.push(n / i);
  }
 num_factors.sort(function(x, y)
   {
     return x - y;});  // numeric sort
     return num_factors;
}

function isFloat(x) {
  return Number(x) === x && x % 1 !== 0;
}

function isInt(n){
  return Number(n) === n && n % 1 === 0;
}