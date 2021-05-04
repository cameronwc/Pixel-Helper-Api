build:
	docker build -t pixel-helper-api:latest .
	docker run -it --env PEXEL_API_KEY --env UNSPLASH_API_KEY --env PIXABAY_API_KEY -p 3000:3000 pixel-helper-api:latest
