import {useState} from 'react'

function App() {
    const [textVal, settextVal] = useState('')
    const [charsNum, setCharsNum] = useState(0)
    const [wordsNum, setWordsNum] = useState(0)
    const [uniqueNum, setUniqueNum] = useState(0)
    const [spacesNum, setSpacesNum] = useState(0)
    const [sentencesNum, setSentencesNum] = useState(0)
    const [paragraphNum, setParagraphNum] = useState(0)
    const [wordDensity, setWordDensity] = useState([])

    function cleanString(str) {
        return str
            .replace(/[^\w\s]|_/g, '')
            .replace(/\s+/g, ' ')
            .toLowerCase();
    }

    function extractSubstr(str, regexp) {
        return cleanString(str).match(regexp) || [];
    }

    // function getWordsByNonWhiteSpace(str) {
    //     return extractSubstr(str, /\S+/g);
    // }

    function getWordsByWordBoundaries(str) {
        return extractSubstr(str, /\b[a-z\d]+\b/g);
    }

    function wordMap(str) {
        return getWordsByWordBoundaries(str).reduce(function (map, word) {
            map[word] = (map[word] || 0) + 1;
            return map;
        }, {});
    }

    function mapToTuples(map) {
        return Object
            .keys(map)
            .map(function (key) {
                return [
                    key, map[key]
                ];
            });
    }

    function mapToSortedTuples(map, sortFn, sortOrder) {
        return mapToTuples(map).sort(function (a, b) {
            return sortFn.call(undefined, a, b, sortOrder);
        });
    }

    // function countWords(str) {
    //     return getWordsByWordBoundaries(str).length;
    // }

    function wordFrequency(str) {
        // return mapToSortedTuples(wordMap(str), function (a, b, order) {
            const freq=  mapToSortedTuples(wordMap(str), function (a, b, order) {
                if (b[1] > a[1]) {
                    return order[1] * -1;
                } else if (a[1] > b[1]) {
                    return order[1] * 1;
                } else {
                    return order[0] * (
                        a[0] < b[0]
                            ? -1
                            : (
                                a[0] > b[0]
                                    ? 1
                                    : 0
                            )
                    );
                }
            }, [1, -1])
            setUniqueNum(freq.length)
        setWordDensity(freq)
    }

    function CalcChar(s) {
        s = s.replace(/\n/g, ''); // newlines to space
        setCharsNum(s.length)
    }
    function CalcWord(s) {
        s = s.replace(/\n/g, ' '); // newlines to space
        s = s.replace(/(^\s*)|(\s*$)/gi, ''); // remove spaces from start + end
        s = s.replace(/[ ]{2,}/gi, ' '); // 2 or more spaces to 1
        if (s == '') {
            setWordsNum(0)
        } else {
            setWordsNum(s.split(' ').length)
        }
    }
    function CalcSpace(s) {
        // const count = (s.match(/\s/g) || []).length;
        const count = s
            .split(" ")
            .length - 1;
        setSpacesNum(count)

    }
    function CalcSentences(s) {

        const sentences = s.split(/[.!?]/);
        const count = sentences
            .filter(sentence => sentence.trim().length > 0)
            .length;
        setSentencesNum(count)
    }
    function CalcParagraphs(s) {
        if (s.replace(/[ ]{2,}/gi, '') == '') {
            setParagraphNum(0)
        } else {
            s = s.replace(/[\n]{2,}/gi, '\n');
            const paragraphs = s.split("\n");
            setParagraphNum(paragraphs.length)
        }

    }

    function HandleContent(e) {
        settextVal(e)
        CalcChar(e)
        CalcWord(e)
        wordFrequency(e)
        CalcSpace(e)
        CalcSentences(e)
        CalcParagraphs(e)

    }

    return (
        <div className="h-fit min-h-[100dvh] bg-gray-900 ">
            <section className="text-gray-400 bg-gray-900 h-full w-full body-font">
                <div className="container px-1 py-4 mx-auto flex flex-col">
                <a
                            href="https://github.com/willybcode/character-counter"
                            aria-label="Character counter GitHub repository"
                            target="_blank"
                            rel="noreferrer"
                            class="py-2 px-5 bg-indigo-800 items-center place-self-end justify-center md:mt-4 text-white  leading-none rounded-full gap-4 w-fit   flex"
                            role="alert">
                            <span class=" rounded-full bg-gray-800 hover:bg-gray-600">
                                <svg
                                    viewBox="0 0 40 40"
                                    className='w-6 h-6 fill-current'
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20 0C8.95 0 0 8.95 0 20C0 28.85 5.725 36.325 13.675 38.975C14.675 39.15 15.05 38.55 15.05 38.025C15.05 37.55 15.025 35.975 15.025 34.3C10 35.225 8.7 33.075 8.3 31.95C8.075 31.375 7.1 29.6 6.25 29.125C5.55 28.75 4.55 27.825 6.225 27.8C7.8 27.775 8.925 29.25 9.3 29.85C11.1 32.875 13.975 32.025 15.125 31.5C15.3 30.2 15.825 29.325 16.4 28.825C11.95 28.325 7.3 26.6 7.3 18.95C7.3 16.775 8.075 14.975 9.35 13.575C9.15 13.075 8.45 11.025 9.55 8.275C9.55 8.275 11.225 7.75 15.05 10.325C16.65 9.875 18.35 9.65 20.05 9.65C21.75 9.65 23.45 9.875 25.05 10.325C28.875 7.725 30.55 8.275 30.55 8.275C31.65 11.025 30.95 13.075 30.75 13.575C32.025 14.975 32.8 16.75 32.8 18.95C32.8 26.625 28.125 28.325 23.675 28.825C24.4 29.45 25.025 30.65 25.025 32.525C25.025 35.2 25 37.35 25 38.025C25 38.55 25.375 39.175 26.375 38.975C30.3454 37.6346 33.7954 35.0829 36.2396 31.6791C38.6838 28.2752 39.9989 24.1905 40 20C40 8.95 31.05 0 20 0Z"
                                        figll="#ffffff" className='text-white'></path>
                                </svg>
                            </span>
                            <span class="font-semibold text-sm flex-auto">Check it out on Github</span>
                            <svg
                                class="fill-current opacity-75 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"><path
                                d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                        </a>
                    <div className="text-center mb-4 pt-4 justify-center flex-col flex">
                        <h1
                            className="sm:text-3xl text-xl font-medium text-center title-font text-slate-100 mb-4">Welcome to
                            <span
                                className='mx-2 font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-400 via-purple-600 to-sky-600'>Character counter</span>.
                            <i className='text-slate-400 text-base ml-2'>Count away</i>
                        </h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">This is a simple Character Counter app</p>

                    </div>

                    <div
                        className='flex justify-center items-center flex-wrap space-x-5 space-y-5 bg-gray-800 pt-5 pb-10 pr-5 overflow-auto rounded-xl'>
                        <div
                            className='bg-gray-900/70  hover:bg-gray-800/70 hover:ring-2 transition-all duration-200 rounded-xl p-3 text-slate-100 font-semibold ml-5 mt-5 overflow-hidden'>
                            <div className='w-fit'>
                                <h2 className="text-gray-500 text-xs font-medium uppercase tracking-wide ">Stats</h2>
                                <ul
                                    role="list"
                                    className="mt-3 grid sm:grid-cols-6 grid-cols-3 gap-0  rounded-xl w-full border-2 divide-x-2 divide-y-2 border-gray-500 overflow-hidden">
                                    <li className="col-span-1 flex shadow-sm">
                                        <div className="flex-1 flex items-center justify-between  bg-white ">
                                            <div className="flex-1 px-4 py-2 text-xs truncate  text-center">
                                                <span className="text-gray-900 font-medium hover:text-gray-600">
                                                    Characters
                                                </span>
                                                <p className="text-gray-500 text-center text-lg">{charsNum}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="col-span-1 flex shadow-sm ">
                                        <div className="flex-1 flex items-center justify-between  bg-white  ">
                                            <div className="flex-1 px-4 py-2 text-xs truncate  text-center">
                                                <span className="text-gray-900 font-medium hover:text-gray-600">
                                                    Words
                                                </span>
                                                <p className="text-gray-500 text-center text-lg">{wordsNum}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="col-span-1 flex shadow-sm ">
                                        <div className="flex-1 flex items-center justify-between  bg-white  ">
                                            <div className="flex-1 px-4 py-2 text-xs truncate  text-center">
                                                <span className="text-gray-900 font-medium hover:text-gray-600">
                                                    Unique
                                                </span>
                                                <p className="text-gray-500 text-center text-lg">{uniqueNum}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="col-span-1 flex shadow-sm ">
                                        <div className="flex-1 flex items-center justify-between bg-white  ">
                                            <div className="flex-1 px-4 py-2 text-xs truncate  text-center">
                                                <span className="text-gray-900 font-medium hover:text-gray-600">
                                                    Spaces
                                                </span>
                                                <p className="text-gray-500 text-center text-lg">{spacesNum}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="col-span-1 flex shadow-sm ">
                                        <div className="flex-1 flex items-center justify-between  bg-white  ">
                                            <div className="flex-1 px-4 py-2 text-xs truncate  text-center">
                                                <span className="text-gray-900 font-medium hover:text-gray-600">
                                                    Sentences
                                                </span>
                                                <p className="text-gray-500 text-center text-lg">{sentencesNum}</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="col-span-1 flex shadow-sm ">
                                        <div className="flex-1 flex items-center justify-between  bg-white  ">
                                            <div className="flex-1 px-4 py-2 text-xs truncate  text-center">
                                                <span className="text-gray-900 font-medium hover:text-gray-600">
                                                    Paragraphs
                                                </span>
                                                <p className="text-gray-500 text-center text-lg">{paragraphNum}</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div
                                className="flex-1 flex items-center justify-between rounded-lg p-3 relative bg-white  ">
                                <textarea
                                    onChange={(e) => {
                                        HandleContent(e.target.value)
                                    }}
                                    value={textVal}
                                    className='bg-slate-200  text-gray-800 font-semibold md:pl-2 py-2 outline-none rounded-md
             focus:ring-2 w-full h-52 focus:ring-blue-500'></textarea>

                            </div>
                        </div>
                        <div className='flex w-fit h-full px-2 bg-slate-300 rounded-xl overflow-auto py-2 max-w-full lg:max-w-[50%] max-h-96'>
                            <table className='px-3 overflow-hidden  rounded-lg mx-auto'>
                                <thead className='bg-gray-100 '>
                                    <tr>
                                        <th  className='text-left px-4 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Word
                                        </th>
                                        <th  className='text-centder px-4 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                            Count
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y  divide-gray-100">
                                    {wordDensity.map((word)=>(

                                    <tr key={word[0]} className='divide-slate-200 divide-x'>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 text-start">{word[0]}</td>
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900 text-center">{word[1]}</td>
                                    </tr>
                                    ))}

                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>
            </section>
            <div className='text-white text-center pb-4 '>Made by <a href="https://codewilly.com" target='_blank' className='italic font-semibold  text-indigo-800 rounded-lg p-0.5 pr-1  transform bg-lime-50/50 text-lg'> CodeWilly</a> </div>

        </div>
    )
}

export default App
