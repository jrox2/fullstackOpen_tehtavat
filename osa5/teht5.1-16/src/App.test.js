import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import blogService from './services/blogs'
import Togglable2 from './components/Togglable2';


describe('<App />', () => {
    
    let app
     describe('when user is not logged', () => {
        beforeEach(() => {
          
            app = mount(<App />)
        })
    
        it('only login form is rendered', () => {
            app.update()
            
            console.log('locasStorage updatenJäkeen: ', localStorage)

            const blogComponents = app.find(Togglable2)

            expect(blogComponents.length).toEqual(0)
    
        })
    }) 

    describe('when user is logged', () => {

        const user = {
            username: 'tester',
            token: '1231231214',
            name: 'Teuvo Testaaja'
          }

       
        beforeEach(() => {
         
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            app = mount(<App />)

      })
  
      it('all notes are rendered', () => {
        app.update()

        console.log('locasStorage updatenJäkeen: ', localStorage)

        const blogComponents = app.find(Togglable2)

        expect(blogComponents.length).toEqual(blogService.blogs.length)
    
      })
    })
  })