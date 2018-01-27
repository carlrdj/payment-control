<template lang="pug">
	footer.footer.bg-white
		.container
			.row
				.col-lg-6.col-md-6.col-sm-4.col-3.text-left
					span.text-primary.pl-2 V. 1.0.1
				.col-lg-6.col-md-6.col-sm-8.col-9.text-right
					span.pr-2
						| Developed by: 
						a(href='mailto:carl.rdj@gmail.com') Dev7
						i.fa.fa-paw.fa-2x(aria-hidden="true")

</template>

<style>
	.footer{
		padding: 1.5em;
		position: fixed;
		bottom: 0px;
		width: 100%;
	}
	.footer p span{
		height: 20px;
	}
	.fa-paw{
		transform: rotate(30deg);
		position: absolute;
		right: -15px;
		top: -4px;
	}
	@media screen and (max-width: 1100px) {
		.fa-paw{
			transform: rotate(-30deg);
			position: absolute;
			right: 175px;
			top: -4px;
		}		
	}
</style>