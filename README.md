# NB News

Welcome to NB-News, a fictional news website, built as part of a week-long coding sprint to showcase my skills as a back-end Javascript developer. Please feel free to fork, clone and play around!

You can also find the online version of the app [here](https://be-nb-news.herokuapp.com/).

## Getting Started

To get your own copy of the project up-and-running, you'll need to clone the [repository](https://github.com/barnardnicholas/be-nc-news) from github. For more information on how to do this, click [here](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository).

### Prerequisites

In order to begin using the project, you will need an Integrated Coding Environment (or IDE) installed on your computer. I used Microsoft's [VS Code](https://code.visualstudio.com/), but you could use any IDE which is compatible with NPM and javascript.

It would also be a good idea to install [git](https://git-scm.com/) on your computer. if you're using a Mac, you would open terminal and enter the following command:

```
npm install git -g
```

Once git is installed, you can clone the repository by navigating Terminal to the folder you wish to clone to and entering the following command:

```
git clone https://github.com/barnardnicholas/be-nc-news
```

This should download the project to your chosen folder and you can open it with VSCode

### Installing

Before you can start using the project, you will need to install some libraries which the prject requires. The file package.json contains entries for each one, but they can be installed automatically by entering the following command into Terminal:

```
npm install
```

Before you can being testing the project, you will need to seed the databases. It would be best to seed in a 'test' environment at first, so the examples here will be along those lines. This can be done with some predefined scripts which are saved in package.json:

```
npm run setup-dbs
```

```
npm run seed-test
```

The test database should now be populated with data.

To test the functionality, you can start the server by entering:

```
npm run nodemon-start
```

This will start the server listening on Port 9090. Opening a web browser and navigationg to [http://localhost:9090](http://localhost:9090) should bring up the server's landing page.

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

- [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
- [Maven](https://maven.apache.org/) - Dependency Management
- [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

- **Billie Thompson** - _Initial work_ - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

- Hat tip to anyone whose code was used
- Inspiration
- etc
