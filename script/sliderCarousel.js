  'use strict';

class SliderCarousel {
  	constructor(){
  		this.main = document.querySelector('.companies-wrapper');
  		this.wrap = document.querySelector('.companies-hor');
  		this.slides = document.querySelector('.companies-hor').children;
  		this.next, 
  		this.prev, 
  		this.slideToShow = 4,
  		this.options = {
  			position: 0,
  			infinity: true,
  			widthSlide: Math.floor( 100 / this.slideToShow),
  			maxPosition: this.slides.length - this.slideToShow 
  		},
		this.responsive = [{
			breakpoint: 1024,
			slidesToShow: 3
		},
		{
			breakpoint: 768,
			slidesToShow: 2
		},
		{
			breakpoint: 576,
			slidesToShow: 1
		}],
		this.infinity = false,
  		this.position = 0,
  		this.slidesToShow = 3
  	}
  		
	  
  	init (){
  		this.addGloClass();
  		this.addStyle();
  		if(this.prev && this.next){
  			this.controlSlider()
  		} else {
  			this.addArrow();
  			this.controlSlider();
  		}
  		if(this.responsive){
  			this.responseInit();
		  }
		  
  	}


  	addGloClass() {
  		this.main.classList.add('glo-slider');
  		this.wrap.classList.add('glo-slider__wrap');
  		for(const item of this.slides) {
  			item.classList.add('glo-slider__item');
  		}
  	}

  	addStyle(){
  		let style = document.getElementById('sliderCarousel-style');
  		if (!style){
  			style = document.createElement('style');
  			style.id = 'sliderCarousel-style';
  		}
  		
  		style.textContent = `
  			.glo-slider{
  				overflow: hidden !important;
  			}
  			.glo-slider__wrap{
  				display: flex;
  				transition: transform 0.5s !important;
  				will-change: transform !important;
  			}
  			.glo-slider__item{
  				flex: 0 0 ${this.options.widthSlide}% !important;
  				margin: auto 0 !important;
  			}
  		`;
  		document.head.appendChild(style);

  	}
  	controlSlider(){
  		this.prev.addEventListener('click', this.prevSlider.bind(this));
  		this.next.addEventListener('click', this.nextSlider.bind(this));
  	}

  	prevSlider(){
  		if(this.options.infinity || this.options.position > 0){
  		--this.options.position;
  			if (this.options.position < 0){
  				console.log (1);
  				this.options.position = this.options.maxPosition;
  			}
  		this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
  		}
  	}

  	nextSlider() {
  			
  			if(this.options.infinity || this.options.position <= this.options.maxPosition){
  				++this.options.position;
  				console.log (this.options.position);
  			if(this.options.position > this.options.maxPosition){
  				console.log (1)
  				this.options.position = 0;
  			}
  			this.wrap.style.transform = `translateX(-${this.options.position * this.options.widthSlide}%)`;
  		}
  	}

  	addArrow(){
  		this.prev = document.createElement('button');
  		this.next = document.createElement('button');

  		this.prev.className = "glo-slider__prev";
  		this.next.className = "glo-slider__next";

  		this.main.appendChild(this.prev);
  		this.main.appendChild(this.next);

  		const style = document.createElement('style');
  		style.textContent = `
  			.glo-slider__prev,
  			.glo-slider__next{
  				margin: 0 10px;
  				border: 20px solid transparent;
  				background: transparent;
  			}
  			.glo-slider__next{
  				border-left-color: #19b5fe;
  			}
  			.glo-slider__prev{
  				border-right-color: #19b5fe;
  			}

  			.glo-slider__prev:hover,
  			.glo-slider__next:focus,
  			.glo-slider__prev:hover,
			.glo-slider__next:focus{
				background:transparent;
				outline: transparent;
			}


  		`;
  		document.head.appendChild(style);
  	}
  	responseInit() {
  		const slidesToShowDefault = this.slideToShow;
  		const allResponse = this.responsive.map(item => item.breakpoint);
  		const maxResponse = Math.max(...allResponse);
  		const checkResponse = () => {
  			const widthWindow = document.documentElement.clientWidth;
  	
  			if(widthWindow < maxResponse){
  				console.log (allResponse.length);
  				for( let i = 0; i < allResponse.length; i++){
  					if (widthWindow < allResponse[i]){
  						this.slideToShow = this.responsive[i].slidesToShow;
  						this.options.widthSlide = Math.floor(100 / this.slideToShow);
  						this.addStyle();
  					} 
  				}
  			}else {
  						this.slideToShow = slidesToShowDefault;
  						this.options.widthSlide = Math.floor(100 / this.slideToShow);
  						this.addStyle();
  			}
  		};

  		window.addEventListener('resize', checkResponse);
  	
  	}

}

const slider = new SliderCarousel();
slider.init();