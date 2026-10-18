'use strict';
document.addEventListener('DOMContentLoaded', () => {
    const engine_options = document.querySelector('#engine-options');
    const search_bar = document.querySelector('#search-bar');
    if (!engine_options || !search_bar) {
        throw new Error("No engine options or search bar!");
    }
    let engine_url;
    let search_query;
    let final_url;
    let is_yandex = false;
    let debounce_bar = false;
    search_bar.addEventListener('keydown', (e) => {
        if (debounce_bar)
            return;
        debounce_bar = true;
        if (e.key === "Enter") {
            switch (engine_options.value) {
                case "bing":
                    engine_url = "https://bing.com/search";
                    break;
                case "brave":
                    engine_url = "https://search.brave.com/search";
                    break;
                case "google":
                    engine_url = "https://google.com/search";
                    break;
                case "mojeek":
                    engine_url = "https://mojeek.com/search";
                    break;
                case "yandex":
                    engine_url = "https://yandex.com/search";
                    is_yandex = true;
                    break;
                default:
                    console.warn("Unknown search engine!");
                    engine_url = "";
                    break;
            }
            search_query = search_bar.value.trim();
            if (search_query) {
                if (!is_yandex) {
                    final_url = `${engine_url}?q=${encodeURIComponent(search_query)}`;
                }
                else {
                    final_url = `${engine_url}?text=${encodeURIComponent(search_query)}`;
                }
            }
            if (final_url) {
                window.open(final_url, undefined, "noreferrer");
            }
        }
        setTimeout(() => {
            debounce_bar = false;
        }, 500);
    });
});
