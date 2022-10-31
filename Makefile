default:
	@echo "please select a command from makefile"

component:
	@mkdir ./src/components/$(role)/$(name)
	@touch ./src/components/$(role)/$(name)/$(name).module.scss
	@touch ./src/components/$(role)/$(name)/$(name).tsx
	@cat ./src/components/snippet/index.tsx | sed 's?SnippetComponent?'$(name)'?' | sed 's?some-classname?'$(name)'?' | sed 's?ISnippetComponentProp?'I$(name)Prop'?' | sed 's?./index.scss?'./$(name).module.scss'?' > ./src/components/$(role)/$(name)/$(name).tsx
	@cat ./src/components/snippet/index.scss | sed 's?some-classname?'$(name)'?'  > ./src/components/$(role)/$(name)/$(name).module.scss
	@git add ./src/components/$(role)/$(name)/$(name).module.scss ./src/components/$(role)/$(name)/$(name).tsx

move:
	@move ./src/components/$(role)/$(source) ./src/components/$(role)/$(target)
