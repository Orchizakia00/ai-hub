const loadAI = async (isShowAll, isSort) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tools`)
    const data = await res.json();
    const cards = data.data.tools;

    displayAI(cards, isShowAll);

    if (isSort) {
        sortCardsByDate (cards);
    }
}


const displayAI = (cards, isShowAll, isSort) => {
    const cardContainer = document.getElementById('card-container');

    cardContainer.innerHTML = '';

    const showAllContainer = document.getElementById('show-all-container')
    if (cards.length > 6 && !isShowAll || !isSort) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }

    if (!isShowAll) {
        cards = cards.slice(0, 6);
    }

    cards.forEach(card => {

        const aiCard = document.createElement('div');
        aiCard.innerHTML = `
        <div class="card card-compact w-96 bg-base-100 shadow-xl">
            <figure class="px-4 pt-4">
                <img src="${card.image}" alt="Shoes" class="rounded-xl" />
            </figure>
            <div class="card-body">
                <h2 class="card-title font-bold">Features:</h2>
                <ol class="list-decimal ml-4 text-left">
                    <li> ${card.features[0]}</li>
                    <li> ${card.features[1]}</li>
                    <li> ${card.features[2]}</li>
                </ol>
                <hr>
                <p class="font-bold text-xl">${card.name}</p>
                <p id="published-date">Release Date: ${card.published_in}</p>
            </div>
        </div>
        `;
        aiCard.addEventListener('click', () => { ShowCardDetails(card.id); });

        cardContainer.appendChild(aiCard);

    });

    // console.log(cards);
    document.getElementById('sort-btn').addEventListener('click', () => {sortCardsByDate (cards)});


}

const ShowCardDetails = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/ai/tool/${id}`);
    const data = await res.json();
    const card = data.data;
    console.log(card);
    // console.log(data.data);

    const showDetailContainer = document.getElementById('modal-container');
    showDetailContainer.innerHTML = `
    <dialog id="my_modal_3" class="modal">
        <form method="dialog" class="modal-box max-w-2xl">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            <div class="flex gap-10">
                <div class="bg-red-50 p-8 flex-1">
                    <p class="py-4">${card.description}</p>
                    <div class="flex gap-4">
                        <div>
                            <ol class="list-decimal ml-4 text-left">
                                <li> ${card.features[1].feature_name}</li>
                                <li> ${card.features[2].feature_name}</li>
                                <li> ${card.features[3].feature_name}</li>
                            </ol>
                        </div>
                    </div>
                </div>
                <div class="flex-1">
                    <img src="${card.image_link[0]}" alt="">
                    <h3 class="font-bold text-lg text-center">${card.tool_name}</h3>
                    <p class="font-semibold text-center">${card.input_output_examples[0].input}</p>
                    <p class="text-center">${card.input_output_examples[0].output}</p>
                </div>
            </div>
        </form>
    </dialog>
    `;

    const modal = document.getElementById('my_modal_3');
    modal.showModal();
}

const sortCardsByDate = (cards) => {
    cards.sort((a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        return dateA - dateB;
    });

    displayAI(cards, true);
};


// handle show all
const handleShowAll = async (id) => {

    loadAI(true);
}


loadAI();