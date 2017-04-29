import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Links } from '../../imports/collections/links';


class LinkList extends Component {
    renderRows() {
        return this.props.links.map(link => {
            const { url, clicks, token } = link;
            const shortLink = `https://leeland-link-shortener.herokuapp.com/${token}`;

            return (
                <tr>
                    <td className="text-wrap">
                        {url}
                    </td>
                    <td>
                        <a href={shortLink}>{shortLink}</a>
                    </td>
                    <td>{clicks}</td>
                </tr>
            );
        });
    }

    render() {
        return (
            <div className="container"><table width="100%" className="table">
                <thead>
                    <tr>
                        <th>URL</th>
                        <th>Address</th>
                        <th>Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table></div>
        );
    }
}

export default createContainer(() => {
    Meteor.subscribe('links');
    
    return { links: Links.find({}).fetch() };
}, LinkList);
