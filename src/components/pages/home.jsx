import Header from '../Header';
import Navbar from '../navbar';
import './home.css';
import React from 'react';
import Featured from '../featured';
import ClassList from '../classlists';
import FeaturedClasses from '../featuredclasses';
import Footer from '../footer';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header />
            <div className="home-container">
                <h1 className="homeTitle">CodePulse Network Classes</h1>
                <FeaturedClasses />
                <h1 className="home-title">Browse Classes</h1>
                <ClassList />
            </div>
            <Featured/>
            <Footer />
        </div>
    );
};

export default Home;
