import React, { useContext, useState } from 'react';
import { Category } from '../../models/Category';
import { LoadingState } from '../../models/LoadingState';
import service from '../../service/ForumService';
import { UserContext } from '../common/UserContext';

const CategoryManager: React.FC = () => {
    const [load, setLoad] = useState<LoadingState>(LoadingState.START);
    const [categories, setCategories] = useState<Category[]>([]);
    const [editing, setEditing] = useState<boolean>(false);
    const [newCategoryName, setNewCategoryName] = useState<string>('');
    const [editCategoryName, setEditCategoryName] = useState<string>('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(-1);
    const [error, setError] = useState<string>('');
    const [saved, setSaved] = useState<string>('');
    const userCtx = useContext(UserContext);

    if (load === LoadingState.START) {
        setLoad(LoadingState.LOADING);
        service.getCategories()
        .then(res => {
            setCategories(res.data);
        });
    }

    const onAdd = () => {
        if (newCategoryName) {
            service.postCategory({name: newCategoryName}, userCtx)
            .then(res => {
                setCategories([res.data, ...categories]);
                setSaved('Category added');
                setError('');
                setNewCategoryName('');
            })
            .catch(err => {
                setError(err.response.data);
                setSaved('');
            });
        }
    }

    const selectCategory = (e:  React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategoryId(parseInt(e.target.value));
    }

    const cancelEdit = () => {
        setEditCategoryName('');
        setEditing(false);
    }

    const onDelete = () => {
        if (selectedCategoryId !== -1) {
            service.deleteCategoryById(selectedCategoryId, userCtx)
            .then(res => {
                setCategories(categories.filter(e => e.id !== selectedCategoryId));
                setSelectedCategoryId(-1);
                setSaved('Category deleted');
                setError('');
            });
        }
    }

    const edit = () => {
        if (selectedCategoryId !== -1) {
            setEditCategoryName(categories.find(e => e.id === selectedCategoryId)!.name);
            setEditing(true);
        }
    }

    const save = () => {
        if (editCategoryName) {
            service.putCategory({id: selectedCategoryId, name: editCategoryName}, userCtx)
            .then(res => {
                setEditing(false);
                categories[categories.findIndex(c => c.id === selectedCategoryId)].name = editCategoryName;
                setCategories([...categories]);
                setSaved('Category updated');
                setError('');
            })
            .catch(err => {
                setError(err.response.data);
                setSaved('');
            });
        }
    }

    return (
        <form className='form-inline' onSubmit={e => {e.preventDefault(); return false;}}>
            {error && <div className="alert alert-danger w-100" role="alert">
                {error}
            </div>}
            {saved && <div className="alert alert-success w-100" role="alert">
                {saved}
            </div>}

            <div className="w-100 mb-2">
                <input className="form-control w-50" placeholder='Name' value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} />
                <button className='btn btn-primary ml-2' type='button' onClick={onAdd} disabled={newCategoryName === ''}>Add</button><br />
            </div>

            <div className="w-100">
                {!editing && <select className='form-control w-50' onChange={selectCategory}>
                    <option value={-1}>Choose...</option>
                    {categories.map(e => (<option value={e.id} key={e.id}>{e.name}</option>))}
                </select>}
                {!editing && <button className='btn btn-primary ml-2' type='button' onClick={edit} disabled={selectedCategoryId === -1}>Edit</button>}
                {!editing && <button className='btn btn-danger ml-2' type='button' onClick={onDelete} disabled={selectedCategoryId === -1}>Delete</button>}

                {editing && <input className="form-control w-50" placeholder='Name' value={editCategoryName} onChange={e => setEditCategoryName(e.target.value)} />}
                {editing && <button className='btn btn-primary ml-2' type='button' onClick={save}>Save</button>}
                {editing && <button className='btn btn-secondary ml-2' type='button' onClick={cancelEdit}>Cancel</button>}
            </div>
        </form>
    );
}

export default CategoryManager;
