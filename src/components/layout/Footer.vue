<template lang="pug">
	footer.footer
		.container
			.content
				p
					span.is-pulled-left
						| v. 1.0.1
					span.is-pulled-right
						strong 
						|  Developed by: 
						a Dev7
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
		right: -35px;
		top: -4px;
	}
	@media screen and (max-width: 1100px) {
		.fa-paw{
			transform: rotate(-30deg);
			position: absolute;
			right: 150px;
			top: -4px;
		}		
	}
</style>