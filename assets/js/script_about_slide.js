Init();


//===============================================================================
//==== INIT =====================================================================
//===============================================================================
function Init(){
	$AnimInProgress=false;//debloque l'animation
	$NumSl = $('.page_slide').length;
	$('#slcompteur').find('i').html(LeadingZero($NumSl-1,3));
	$CurrSl=1;
	$Zindex=100;
	vClients=vProjets=vType=vCompteur=vLeadZero="";
	ct=0;
	$('.page_slide').each(function(){
		vClients = vClients+$(this).find('strong').html()+"<br>";
		vProjets = vProjets+$(this).find('h1').html()+"<br>";
		vType = vType+$(this).find('b').html()+"<br>";
		vLeadZero = vLeadZero+"0<br>";
		vCompteur = vCompteur+ct+"<br>";
		ct=ct+1;
	});
	$('#slclient').find('div').html('<span>client</span> <span class="scroll">'+vClients+'</span>');
	$('#slprojet').find('div').html('<span>projet</span> <span class="scroll">'+vProjets+'</span>');
	$('#sltype').find('div').html('<span>type</span> <span class="scroll">'+vType+'</span>');
	$('#slcompteur').find('b>span:nth-child(2),b>span:nth-child(1)').html(vLeadZero);
	$('#slcompteur').find('b>span:nth-child(3)').html(vCompteur);
	$('#more').addClass('hide');
	var indicator = new WheelIndicator({elem:document.querySelector('#page_slider'),callback: function(e){ ScrollMe(e.direction); }});
	indicator.getOption('preventMouse');
	
	
	Jump2Slide(1);
}

//===============================================================================
//==== ON SCROLL ================================================================
//===============================================================================
function ScrollMe(Direction){
	if($AnimInProgress==false){
		if(Direction=='down'){
			
			$AnimInProgress=true;//bloque l'animation
			$ThisSl = $(".page_slide:nth-child("+$CurrSl+")");//definit panneau sortant
			if($CurrSl<$NumSl){$CurrSl+=1;}else if($CurrSl==$NumSl){$CurrSl=1;}
			$VisOrigine = '100px';
			$VisOut = '-100px';
		}else if(Direction=='up' && $CurrSl>1){
			$AnimInProgress=true;//bloque l'animation
			$ThisSl = $(".page_slide:nth-child("+$CurrSl+")");//definit panneau sortant
			$CurrSl-=1;
			$VisOrigine = '-100px';
			$VisOut = '100px';
		}else{
			$AnimInProgress=false;//debloque l'animation
			exit;
		}
		$Zindex +=1;
		SwitchSlider();
	}
}

function Jump2Slide(n){
	if($AnimInProgress==false){
		$AnimInProgress=true;//bloque l'animation
		$ThisSl = $(".page_slide:nth-child("+$CurrSl+")");//definit panneau sortant
		if($CurrSl>n){
			$VisOrigine = '-100px';
			$VisOut = '100px';
		}else{
			$VisOrigine = '100px';
			$VisOut = '-100px';
		}

		$CurrSl=n+1;
		$Zindex +=1;
		SwitchSlider();
	}
}

//===============================================================================
//==== SWITCH PANE ==============================================================
//===============================================================================
function SwitchSlider(){
	$('#more').addClass('hide');//cache le +
	$SlCible = $(".page_slide:nth-child("+$CurrSl+")");//definit paneau entrant
	$SlCible.css('z-index',$Zindex);//force le nouveau z-index du panneau cible
	$('#slcontent').css('z-index',$Zindex+20);//force le nouveau z-index du bloc ligne+compteur
	CibleScrollLine = ($CurrSl - 1) * 18;//increment ligne
	CibleScrollCompteur = ($CurrSl - 1) * 180;//increment compteur
	if($CurrSl==1){
		TweenMax.to($('#slcontent').find('div'),0.5,{y:'50px',opacity:0,ease:Power4.easeOut});//Masque les lignes et le compteur
	}else{
		TweenMax.staggerTo($('#slcontent').find('div'),1,{y:'0px',opacity:1,ease:Power4.easeOut},0.05);//Affiche les lignes et le compteur
	}
	
	TweenMax.fromTo($ThisSl.find('.vis'),1, {y:'0px',ease:Power4.easeOut}, {y:$VisOut});//masque ancien visuel
	TweenMax.fromTo($SlCible.find('.vis'),1, {y:$VisOrigine,ease:Power4.easeOut}, {y:'0px'});//affiche nouveau visuel
	TweenMax.staggerTo($('.line').find('.scroll'),0.6, {scrollTo:{y:CibleScrollLine, x:0},ease:Expo.easeOut},0.1);//scroll les lignes
	TweenMax.staggerTo($('#slcompteur').find('span'),0.6, {scrollTo:{y:CibleScrollCompteur, x:0},ease:Expo.easeOut},0.1);//scroll le compteur
	//change de panneau
	TweenMax.to($SlCible,1.1,{width:'100%',onComplete:function(){
		if($SlCible.find('a').length){
			$('#more').attr('href',$SlCible.find('a').attr('href')).removeClass('hide');
		}//cache le + si pas de lien
		$(".page_slide:not(:nth-child("+$CurrSl+"))").css('width','0%');//init autres panneaux
		$AnimInProgress=false;//debloque l'animation
	}});
}

function LeadingZero(number,width){
	width -= number.toString().length; if (width>0){ return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number; } return number + "";
}